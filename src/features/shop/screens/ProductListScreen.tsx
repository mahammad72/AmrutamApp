import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useGetProductsQuery } from '../../../services/api/baseApi';
import type { Product, ProductCategory, ProductSort } from '../types/product';
import ProductCard from '../components/ProductCard';
import { ShopStackParamList } from '../../../app/navigation/ShopNavigator';
import { colors } from '../../../theme/colors';
import ProductFilters from '../components/ProductFilters';
import SortSelector from '../components/SortSelector';
import { useDebouncedValue } from '../utils/useDebouncedValue';
import { useAppDispatch } from '../../../store/hooks';
import { addToCart } from '../store/cartSlice';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductList'>;

const PAGE_SIZE = 20;

const ProductListScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState('');

  const [categories, setCategories] = useState<ProductCategory[]>([]);

  const [minRating, setMinRating] = useState<number | undefined>();

  const [sort, setSort] = useState<ProductSort>('relevance');
  const [priceRange, setPriceRange] = useState<
    'all' | '0_500' | '500_1000' | '1000_2000' | '2000_plus'
  >('all');

  const getPriceFilters = () => {
    switch (priceRange) {
      case '0_500':
        return {
          minPrice: 0,
          maxPrice: 500,
        };

      case '500_1000':
        return {
          minPrice: 500,
          maxPrice: 1000,
        };

      case '1000_2000':
        return {
          minPrice: 1000,
          maxPrice: 2000,
        };

      case '2000_plus':
        return {
          minPrice: 2000,
        };

      default:
        return {};
    }
  };

  // const priceFilters =
  //   getPriceFilters();

  const debouncedSearch = useDebouncedValue(search, 300);

  const { data, isLoading, isFetching, isError, refetch } = useGetProductsQuery(
    {
      page,
      limit: PAGE_SIZE,
      search: debouncedSearch,
      categories,
      minRating,
      sort,

      //   ...priceFilters
    },
  );

  useEffect(() => {
    if (!data?.data) {
      return;
    }

    setProducts(current => {
      if (page === 1) {
        return data.data;
      }

      const existingIds = new Set(current.map(product => product.id));

      return [
        ...current,
        ...data.data.filter(product => !existingIds.has(product.id)),
      ];
    });
  }, [data, page]);

  const handleLoadMore = useCallback(() => {
    if (isFetching || !data?.hasNextPage) {
      return;
    }

    setPage(current => current + 1);
  }, [data?.hasNextPage, isFetching]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setProducts([]);
    refetch();
  }, [refetch]);

  const handleProductPress = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetails', {
        product,
      });
    },
    [navigation],
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      dispatch(addToCart(product));
    },
    [dispatch],
  );

  useEffect(() => {
    setPage(1);
    setProducts([]);
  }, [debouncedSearch, search, categories, minRating, sort]);

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
    setProducts([]);
  };

  const updateCategories = (category: ProductCategory) => {
    setCategories(current => {
      const exists = current.includes(category);

      if (exists) {
        return current.filter(item => item !== category);
      }

      return [...current, category];
    });

    setPage(1);
    setProducts([]);
  };

  const updateRating = (rating?: number) => {
    setMinRating(rating);
    setPage(1);
    setProducts([]);
  };

  const updateSort = (value: ProductSort) => {
    setSort(value);
    setPage(1);
    setProducts([]);
  };

  const renderItem = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard
        product={item}
        onPress={handleProductPress}
        onAddToCart={handleAddToCart}
      />
    ),
    [handleProductPress, handleAddToCart],
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />

        <Text>Loading products...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Unable to load products.</Text>

        <Pressable style={styles.retry} onPress={refetch}>
          <Text style={styles.retryText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  //   const filteredProducts = products.filter(product => {
  //     if (!search.trim()) {
  //       return true;
  //     }

  //     return product.name.toLowerCase().includes(search.trim().toLowerCase());
  //   });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ayurvedic Shop</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search products..."
        style={styles.search}
      />

      <ProductFilters
        selectedCategories={categories}
        minRating={minRating}
        onToggleCategory={updateCategories}
        onRatingChange={updateRating}
        onClear={() => {
          setCategories([]);
          setMinRating(undefined);
          setPage(1);
          setProducts([]);
        }}
      />

      <SortSelector value={sort} onChange={updateSort} />

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && page === 1}
            onRefresh={handleRefresh}
          />
        }
        ListFooterComponent={
          isFetching && page > 1 ? (
            <View style={styles.footer}>
              <ActivityIndicator />
              <Text>Loading more...</Text>
            </View>
          ) : undefined
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No products found.</Text>
          </View>
        }
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
  },

  title: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: '800',
  },

  search: {
    marginTop: 14,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.white,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  retry: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },

  retryText: {
    color: colors.white,
    fontWeight: '700',
  },

  footer: {
    padding: 20,
    alignItems: 'center',
  },

  empty: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
  },
});
