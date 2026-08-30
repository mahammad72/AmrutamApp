import React, {
  memo,
} from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type {
  Product,
} from '../types/product';

interface Props {
  product: Product;
  onPress: (
    product: Product,
  ) => void;
  onAddToCart: (
    product: Product,
  ) => void;
}

const ProductCard = memo(
  ({
    product,
    onPress,
    onAddToCart,
  }: Props) => {
    return (
      <Pressable
        style={styles.card}
        onPress={() =>
          onPress(product)
        }
      >
        <Image
          source={{
            uri: product.image,
          }}
          style={styles.image}
        />

        {product.discountPercentage >
          0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {product.discountPercentage}%
              OFF
            </Text>
          </View>
        )}

        <Text
          numberOfLines={2}
          style={styles.name}
        >
          {product.name}
        </Text>

        <Text
          numberOfLines={2}
          style={styles.description}
        >
          {product.description}
        </Text>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>
            ★ {product.rating.toFixed(1)}
          </Text>

          <Text style={styles.reviews}>
            ({product.reviewCount})
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>
            ₹{product.price}
          </Text>

          <Text
            style={styles.originalPrice}
          >
            ₹{product.originalPrice}
          </Text>
        </View>

        <Pressable
          disabled={!product.inStock}
          style={[
            styles.cartButton,
            !product.inStock &&
              styles.disabled,
          ]}
          onPress={() =>
            onAddToCart(product)
          }
        >
          <Text
            style={styles.cartButtonText}
          >
            {product.inStock
              ? 'Add to Cart'
              : 'Out of Stock'}
          </Text>
        </Pressable>
      </Pressable>
    );
  },
);

ProductCard.displayName =
  'ProductCard';

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
  },

  badge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#4F6F52',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },

  name: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
  },

  description: {
    marginTop: 5,
    fontSize: 12,
    color: '#6B7280',
  },

  ratingRow: {
    flexDirection: 'row',
    marginTop: 8,
  },

  rating: {
    fontSize: 12,
    fontWeight: '600',
  },

  reviews: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6B7280',
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  price: {
    fontSize: 17,
    fontWeight: '800',
  },

  originalPrice: {
    marginLeft: 7,
    fontSize: 12,
    color: '#9CA3AF',
    textDecorationLine:
      'line-through',
  },

  cartButton: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
    backgroundColor: '#4F6F52',
  },

  disabled: {
    opacity: 0.5,
  },

  cartButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});