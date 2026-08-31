import React, { useMemo, useState } from 'react';

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';

import { selectCartItems, selectCartSubtotal } from '../store/cartSelectors';

import type { PaymentMethod } from '../types/checkout';
import { clearCart } from '../store/cartSlice';

const CheckoutScreen = ({ navigation }: any) => {
  const items = useAppSelector(selectCartItems);

  const subtotal = useAppSelector(selectCartSubtotal);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');

  const [phone, setPhone] = useState('');

  const [address, setAddress] = useState('');

  const [city, setCity] = useState('');

  const [state, setState] = useState('');

  const [pincode, setPincode] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  const deliveryCharge = subtotal >= 999 ? 0 : 49;

  const discount = subtotal >= 2000 ? 200 : 0;

  const total = useMemo(
    () => subtotal + deliveryCharge - discount,
    [subtotal, deliveryCharge, discount],
  );

  const handlePlaceOrder = () => {
    if (
      !name.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pincode.trim()
    ) {
      Alert.alert(
        'Missing Information',
        'Please complete your delivery address.',
      );

      return;
    }

    dispatch(clearCart());

    navigation.navigate('OrderSuccess', {
      total,
      paymentMethod,
    });
  };

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ========================= */}
      {/* Delivery Address */}
      {/* ========================= */}

      <View style={styles.section}>
        <Text style={styles.title}>Delivery Address</Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
          multiline
          style={[styles.input, styles.textArea]}
        />

        <TextInput
          placeholder="City"
          value={city}
          onChangeText={setCity}
          style={styles.input}
        />

        <TextInput
          placeholder="State"
          value={state}
          onChangeText={setState}
          style={styles.input}
        />

        <TextInput
          placeholder="Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
        />
      </View>

      {/* ========================= */}
      {/* Payment */}
      {/* ========================= */}

      <View style={styles.section}>
        <Text style={styles.title}>Payment Method</Text>

        {(
          [
            ['cod', 'Cash on Delivery'],
            ['upi', 'UPI'],
            ['card', 'Credit / Debit Card'],
          ] as [PaymentMethod, string][]
        ).map(([value, label]) => {
          const selected = paymentMethod === value;

          return (
            <Pressable
              key={value}
              style={[styles.payment, selected && styles.selectedPayment]}
              onPress={() => setPaymentMethod(value)}
            >
              <View style={[styles.radio, selected && styles.selectedRadio]} />

              <Text style={styles.paymentText}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* ========================= */}
      {/* Summary */}
      {/* ========================= */}

      <View style={styles.section}>
        <Text style={styles.title}>Order Summary</Text>

        <View style={styles.row}>
          <Text>Subtotal</Text>

          <Text>₹{subtotal}</Text>
        </View>

        <View style={styles.row}>
          <Text>Delivery</Text>

          <Text>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</Text>
        </View>

        {discount > 0 && (
          <View style={styles.row}>
            <Text>Discount</Text>

            <Text>-₹{discount}</Text>
          </View>
        )}

        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>

          <Text style={styles.total}>₹{total}</Text>
        </View>
      </View>

      <Pressable style={styles.placeOrder} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderText}>Place Order • ₹{total}</Text>
      </Pressable>
    </ScrollView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F3',
  },

  content: {
    padding: 15,
    paddingBottom: 35,
  },

  section: {
    padding: 15,
    marginBottom: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },

  title: {
    marginBottom: 14,
    fontSize: 17,
    fontWeight: '800',
  },

  input: {
    minHeight: 48,
    marginBottom: 10,
    paddingHorizontal: 13,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },

  textArea: {
    minHeight: 85,
    paddingTop: 12,
    textAlignVertical: 'top',
  },

  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  selectedPayment: {
    borderColor: '#4F6F52',
  },

  radio: {
    width: 20,
    height: 20,
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9CA3AF',
  },

  selectedRadio: {
    borderWidth: 6,
    borderColor: '#4F6F52',
  },

  paymentText: {
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  totalRow: {
    marginTop: 5,
    paddingTop: 13,
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

  placeOrder: {
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#4F6F52',
  },

  placeOrderText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
