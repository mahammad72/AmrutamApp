import React, { useCallback } from 'react';

import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../../store';

import { cancelBooking } from '../store/consultationSlice';

import { cancelBooking as cancelBookingService } from '../services/bookingService';

const UpcomingConsultationScreen = () => {
  const dispatch = useDispatch();

  const bookings = useSelector(
    (state: RootState) => state.consultation.bookings,
  );

  const upcomingBookings = bookings.filter(
    booking => booking.status === 'confirmed',
  );

  const handleCancel = useCallback(
    (bookingId: string) => {
      Alert.alert(
        'Cancel consultation',
        'Are you sure you want to cancel this consultation?',
        [
          {
            text: 'Keep',
            style: 'cancel',
          },
          {
            text: 'Cancel',
            style: 'destructive',
            onPress: () => {
              const result = cancelBookingService(bookingId);

              if (!result.success) {
                Alert.alert('Unable to cancel', result.error);

                return;
              }

              dispatch(cancelBooking(bookingId));
            },
          },
        ],
      );
    },
    [dispatch],
  );

  if (upcomingBookings.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No upcoming consultations</Text>

        <Text style={styles.emptyText}>
          Your confirmed consultations will appear here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Consultation</Text>

      {upcomingBookings.map(booking => (
        <View key={booking.id} style={styles.card}>
          <Text style={styles.doctor}>{booking.doctorName}</Text>

          <Text style={styles.date}>{booking.date}</Text>

          <Text style={styles.time}>
            {booking.startTime} - {booking.endTime}
          </Text>

          <Text style={styles.fee}>₹{booking.consultationFee}</Text>

          <Pressable
            style={styles.cancelButton}
            onPress={() => handleCancel(booking.id)}
          >
            <Text style={styles.cancelText}>Cancel Consultation</Text>
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default UpcomingConsultationScreen;

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

  doctor: {
    fontSize: 18,
    fontWeight: '700',
  },

  date: {
    marginTop: 12,
    fontSize: 14,
  },

  time: {
    marginTop: 5,
    color: '#6B7280',
  },

  fee: {
    marginTop: 12,
    fontWeight: '700',
  },

  cancelButton: {
    marginTop: 20,
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D32F2F',
  },

  cancelText: {
    color: '#D32F2F',
    fontWeight: '600',
  },

  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  emptyText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#6B7280',
  },
});
