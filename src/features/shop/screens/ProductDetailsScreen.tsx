import React from 'react';

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../../../app/navigation/ShopNavigator';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addToCart, toggleWishlist } from '../store/cartSlice';
import { selectIsWishlisted } from '../store/cartSelectors';

type Props = NativeStackScreenProps<ShopStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = ({ route }: Props) => {
  const { product } = route.params;

  const dispatch = useAppDispatch();

  const isWishlisted = useAppSelector(selectIsWishlisted(product.id));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{
          uri: product.image,
        }}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.category}>{product.category}</Text>

        <Text style={styles.title}>{product.name}</Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>★ {product.rating.toFixed(1)}</Text>

          <Text style={styles.reviews}>{product.reviewCount} reviews</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{product.price}</Text>

          <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>

        <Pressable style={styles.cartButton} onPress={handleAddToCart}>
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </Pressable>

        <Pressable style={styles.wishlistButton} onPress={handleWishlist}>
          <Text style={styles.wishlistText}>
            {' '}
            {isWishlisted ? '♥ Remove from Wishlist' : '♡ Add to Wishlist'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: '#F8F8F3',
  },

  image: {
    width: '100%',
    height: 350,
    backgroundColor: '#EEEEEE',
  },

  card: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  category: {
    fontSize: 13,
    color: '#4F6F52',
    fontWeight: '600',
  },

  title: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: '800',
  },

  ratingRow: {
    flexDirection: 'row',
    marginTop: 12,
  },

  rating: {
    fontWeight: '700',
  },

  reviews: {
    marginLeft: 8,
    color: '#6B7280',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 18,
  },

  price: {
    fontSize: 25,
    fontWeight: '800',
  },

  originalPrice: {
    marginLeft: 10,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },

  description: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 23,
    color: '#4B5563',
  },

  cartButton: {
    marginTop: 25,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#4F6F52',
  },

  cartButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  wishlistButton: {
    marginTop: 12,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4F6F52',
  },

  wishlistText: {
    color: '#4F6F52',
    fontWeight: '700',
  },
});
