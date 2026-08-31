import React from 'react';

import { Pressable, StyleSheet, Text, View } from 'react-native';

const OrderSuccessScreen = ({ navigation, route }: any) => {
  const { total, paymentMethod } = route.params ?? {};

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.check}>✓</Text>
      </View>

      <Text style={styles.title}>Order Placed!</Text>

      <Text style={styles.message}>
        Your Ayurvedic products have been ordered successfully.
      </Text>

      <View style={styles.card}>
        <Text>Order Total</Text>

        <Text style={styles.total}>₹{total}</Text>

        <Text style={styles.payment}>
          Payment:{' '}
          {paymentMethod === 'cod'
            ? 'Cash on Delivery'
            : paymentMethod === 'upi'
            ? 'UPI'
            : 'Card'}
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('ProductList')}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </Pressable>
    </View>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    backgroundColor: '#F8F8F3',
  },

  icon: {
    width: 75,
    height: 75,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F6F52',
  },

  check: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '800',
  },

  title: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: '900',
  },

  message: {
    marginTop: 8,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 21,
  },

  card: {
    width: '100%',
    marginTop: 25,
    padding: 20,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  total: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: '900',
  },

  payment: {
    marginTop: 8,
    color: '#6B7280',
  },

  button: {
    width: '100%',
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#4F6F52',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
