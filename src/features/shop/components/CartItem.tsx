import React, { memo } from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { CartItem as CartItemType } from '../types/cart';

interface Props {
  item: CartItemType;

  onIncrease: (id: string) => void;

  onDecrease: (id: string) => void;

  onRemove: (id: string) => void;
}

const CartItem = memo(({ item, onIncrease, onDecrease, onRemove }: Props) => {
  const { product, quantity } = item;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: product.image,
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.name}>
          {product.name}
        </Text>

        <Text style={styles.price}>₹{product.price}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.quantity}>
            <Pressable
              onPress={() => onDecrease(product.id)}
              style={styles.quantityButton}
            >
              <Text>-</Text>
            </Pressable>

            <Text style={styles.quantityText}>{quantity}</Text>

            <Pressable
              onPress={() => onIncrease(product.id)}
              style={styles.quantityButton}
            >
              <Text>+</Text>
            </Pressable>
          </View>

          <Pressable onPress={() => onRemove(product.id)}>
            <Text style={styles.remove}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    fontSize: 14,
    fontWeight: '700',
  },

  price: {
    marginTop: 7,
    fontSize: 16,
    fontWeight: '800',
  },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityText: {
    minWidth: 30,
    textAlign: 'center',
    fontWeight: '700',
  },

  remove: {
    color: '#D32F2F',
    fontSize: 12,
    fontWeight: '600',
  },
});
