import React, { useCallback, useMemo } from 'react';

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { toggleWishlist, addToCart } from '../store/cartSlice';

import { selectWishlist } from '../store/cartSelectors';

import { useGetProductsQuery } from '../../../services/api/baseApi';

import ProductCard from '../components/ProductCard';

const WishlistScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  //   const wishlist = useAppSelector(selectWishlist);
  const wishlist = useAppSelector(selectWishlist);

  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 20,
  });

  const products = useMemo(() => {
    if (!data?.data) {
      return [];
    }

    return data.data.filter(product => wishlist.includes(product?.id));
  }, [data, wishlist]);

  const handleRemove = useCallback(
    (item: any) => {
        console.log("wishlist ", item)
        // return;
      dispatch(toggleWishlist(item));
    },
    [dispatch],
  );

  const handleAddToCart = useCallback(
    (product: any) => {
      dispatch(addToCart(product));
    },
    [dispatch],
  );

  if (!isLoading && wishlist.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>♡</Text>

        <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>

        <Text style={styles.emptyText}>
          Save your favourite Ayurvedic products here.
        </Text>

        <Pressable
          style={styles.shopButton}
          onPress={() => {
            console.log('---click ')
            navigation.navigate('ProductList')}}
        >
          <Text style={styles.shopButtonText}>Continue Shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  product: item,
                })
              }
              onAddToCart={() => dispatch(addToCart(item))}
            />

            <Pressable
              style={styles.removeButton}
              onPress={() => handleRemove(item)}
            >
              <Text style={styles.removeText}>♥</Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text>No wishlist products available.</Text>
          </View>
        }
      />
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F3',
  },

  list: {
    padding: 10,
  },

  cardWrapper: {
    flex: 1,
    margin: 5,
    position: 'relative',
  },

  removeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  removeText: {
    fontSize: 18,
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },

  emptyIcon: {
    fontSize: 55,
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 21,
    fontWeight: '800',
  },

  emptyText: {
    marginTop: 8,
    color: '#6B7280',
    textAlign: 'center',
  },

  shopButton: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
    backgroundColor: '#4F6F52',
  },

  shopButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
