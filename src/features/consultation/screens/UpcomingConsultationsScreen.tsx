import React, {
  useCallback,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useCancelBookingMutation,
  useGetUpcomingBookingsQuery,
} from '../../../services/api/baseApi';

const UpcomingConsultationScreen =
  () => {
    const {
      data: bookings = [],
      isLoading,
      isError,
    } =
      useGetUpcomingBookingsQuery();

    const [
      cancelBooking,
      {
        isLoading: isCancelling,
      },
    ] =
      useCancelBookingMutation();

    const handleCancel =
      useCallback(
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

                onPress: async () => {
                  try {
                    await cancelBooking(
                      bookingId,
                    ).unwrap();

                    Alert.alert(
                      'Cancelled',
                      'Your consultation has been cancelled.',
                    );
                  } catch (error: any) {
                    Alert.alert(
                      'Cancellation failed',
                      error?.error ??
                        'Unable to cancel booking.',
                    );
                  }
                },
              },
            ],
          );
        },
        [cancelBooking],
      );

    if (isLoading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text>
            Loading consultation...
          </Text>
        </View>
      );
    }

    if (isError) {
      return (
        <View style={styles.center}>
          <Text>
            Unable to load consultations.
          </Text>
        </View>
      );
    }

    if (bookings.length === 0) {
      return (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>
            No upcoming consultations
          </Text>

          <Text style={styles.emptyText}>
            Your confirmed consultations
            will appear here.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Upcoming Consultation
        </Text>

        {bookings.map(booking => (
          <View
            key={booking.id}
            style={styles.card}
          >
            <Text style={styles.doctor}>
              {booking.doctorName}
            </Text>

            <Text style={styles.date}>
              {booking.date}
            </Text>

            <Text style={styles.time}>
              {booking.startTime} -{' '}
              {booking.endTime}
            </Text>

            <Text style={styles.fee}>
              ₹{booking.consultationFee}
            </Text>

            <Pressable
              disabled={isCancelling}
              style={styles.cancelButton}
              onPress={() =>
                handleCancel(
                  booking.id,
                )
              }
            >
              <Text
                style={styles.cancelText}
              >
                {isCancelling
                  ? 'Cancelling...'
                  : 'Cancel Consultation'}
              </Text>
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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
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

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  emptyText: {
    marginTop: 8,
    color: '#6B7280',
    textAlign: 'center',
  },
});