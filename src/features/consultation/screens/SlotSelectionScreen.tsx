import React, { useCallback, useMemo } from 'react';

import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useGetDoctorSlotsQuery } from '../../../services/api/baseApi';

import type { DoctorSlot } from '../types/doctor';

import { isSlotAvailable } from '../utils/bookingUtils';
import { ConsultationStackParamList } from '../../../app/navigation/ConsultationNavigator';

type Props = NativeStackScreenProps<
  ConsultationStackParamList,
  'SlotSelection'
>;

const SlotSelectionScreen = ({ route, navigation }: Props) => {
  const { doctor } = route.params;

  const {
    data: slots = [],
    isLoading,
    isError,
  } = useGetDoctorSlotsQuery(doctor.id);

  const availableSlots = useMemo(() => slots.filter(isSlotAvailable), [slots]);

  const handleSlotPress = useCallback(
    (slot: DoctorSlot) => {
      navigation.navigate('BookingConfirmation', {
        doctor,
        slot,
      });
    },
    [doctor, navigation],
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
        <Text>Loading available slots...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Unable to load slots.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a consultation slot</Text>

      <Text style={styles.doctor}>{doctor.name}</Text>

      <Text style={styles.subtitle}>Available slots</Text>

      {availableSlots.length === 0 ? (
        <View style={styles.center}>
          <Text>No available slots.</Text>
        </View>
      ) : (
        availableSlots.map(slot => (
          <Pressable
            key={slot.id}
            style={styles.slot}
            onPress={() => handleSlotPress(slot)}
          >
            <Text style={styles.date}>{slot.date}</Text>

            <Text style={styles.time}>
              {slot.startTime} - {slot.endTime}
            </Text>
          </Pressable>
        ))
      )}
    </View>
  );
};

export default SlotSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F3',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
  },

  doctor: {
    marginTop: 8,
    fontSize: 16,
    color: '#4F6F52',
  },

  subtitle: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '600',
  },

  slot: {
    padding: 16,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  date: {
    fontSize: 14,
    fontWeight: '600',
  },

  time: {
    marginTop: 5,
    color: '#6B7280',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  error: {
    color: '#D32F2F',
  },
});
