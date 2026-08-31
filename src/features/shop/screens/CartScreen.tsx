import React, { useCallback } from 'react';

import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../store/cartSlice';

import { selectCartItems, selectCartSubtotal } from '../store/cartSelectors';

import CartItem from '../components/CartItem';

const CartScreen = ({navigation}:any) => {
  const dispatch = useAppDispatch();

  const items = useAppSelector(selectCartItems);

  const subtotal = useAppSelector(selectCartSubtotal);

  const handleIncrease = useCallback(
    (id: string) => {
      dispatch(increaseQuantity(id));
    },
    [dispatch],
  );

  const handleDecrease = useCallback(
    (id: string) => {
      dispatch(decreaseQuantity(id));
    },
    [dispatch],
  );

  const handleRemove = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>

        <Text style={styles.emptyText}>
          Add products to your cart to continue.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={item => item.product.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.list}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text>Subtotal</Text>

          <Text style={styles.amount}>₹{subtotal}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text>Delivery</Text>

          <Text style={styles.free}>FREE</Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>

          <Text style={styles.total}>₹{subtotal}</Text>
        </View>

        <Pressable
          style={styles.checkout}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F3',
  },

  list: {
    padding: 12,
  },

  separator: {
    height: 10,
  },

  summary: {
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  amount: {
    fontWeight: '600',
  },

  free: {
    fontWeight: '700',
  },

  totalRow: {
    marginTop: 5,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  totalLabel: {
    fontSize: 17,
    fontWeight: '800',
  },

  total: {
    fontSize: 19,
    fontWeight: '800',
  },

  checkout: {
    marginTop: 10,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#4F6F52',
  },

  checkoutText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#F8F8F3',
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
  },

  emptyText: {
    marginTop: 8,
    color: '#6B7280',
  },
});
