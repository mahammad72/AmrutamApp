import React, { useCallback, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../../../store';

import { addBooking } from '../store/consultationSlice';

import { createBooking } from '../services/bookingService';
import { ConsultationStackParamList } from '../../../app/navigation/ConsultationNavigator';

type Props = NativeStackScreenProps<
  ConsultationStackParamList,
  'BookingConfirmation'
>;

const BookingConfirmationScreen = ({ route, navigation }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { doctor, slot } = route.params;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = useCallback(() => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    // Simulate a small API delay.
    setTimeout(() => {
      const result = createBooking({
        doctor,
        slotId: slot.id,
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });

      setIsSubmitting(false);

      if (!result.success) {
        Alert.alert('Booking failed', result.error);

        return;
      }

      if (!result.booking) {
        return;
      }

      dispatch(addBooking(result.booking));

      Alert.alert(
        'Booking confirmed',
        `Your consultation with ${doctor.name} is confirmed.`,
        [
          {
            text: 'View Consultation',
            onPress: () => {
              navigation.popToTop();
            },
          },
        ],
      );
    }, 500);
  }, [doctor, slot, dispatch, navigation, isSubmitting]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Consultation</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Doctor</Text>

        <Text style={styles.value}>{doctor.name}</Text>

        <Text style={styles.label}>Specialization</Text>

        <Text style={styles.value}>{doctor.specialization}</Text>

        <Text style={styles.label}>Date</Text>

        <Text style={styles.value}>{slot.date}</Text>

        <Text style={styles.label}>Time</Text>

        <Text style={styles.value}>
          {slot.startTime} - {slot.endTime}
        </Text>

        <Text style={styles.label}>Consultation Fee</Text>

        <Text style={styles.fee}>₹{doctor.consultationFee}</Text>
      </View>

      <Pressable
        disabled={isSubmitting}
        style={[styles.button, isSubmitting && styles.disabledButton]}
        onPress={handleConfirm}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Confirm Booking</Text>
        )}
      </Pressable>
    </View>
  );
};

export default BookingConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F3',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },

  card: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
  },

  label: {
    marginTop: 14,
    fontSize: 12,
    color: '#6B7280',
  },

  value: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '600',
  },

  fee: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '700',
  },

  button: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#4F6F52',
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
