import React, { memo } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import type { Doctor } from '../features/consultation/types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
  onPress: (doctor: Doctor) => void;
}

const DoctorCard = ({
  doctor,
  onPress,
}: DoctorCardProps) => {
  return (
    <Pressable
      style={styles.card}
      onPress={() => onPress(doctor)}
    >
      <Image
        source={{ uri: doctor.avatar }}
        style={styles.avatar}
      />

      <View style={styles.content}>
        <Text style={styles.name}>
          {doctor.name}
        </Text>

        <Text style={styles.specialization}>
          {doctor.specialization}
        </Text>

        <Text style={styles.experience}>
          {doctor.experience} years experience
        </Text>

        <View style={styles.row}>
          <Text style={styles.rating}>
            ⭐ {doctor.rating}
          </Text>

          <Text style={styles.fee}>
            ₹{doctor.consultationFee}
          </Text>
        </View>

        <View style={styles.status}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor:
                  doctor.availableToday
                    ? '#2E7D32'
                    : '#9CA3AF',
              },
            ]}
          />

          <Text style={styles.statusText}>
            {doctor.availableToday
              ? 'Available today'
              : 'Not available today'}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(DoctorCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
  },

  specialization: {
    marginTop: 4,
    fontSize: 14,
    color: '#4F6F52',
  },

  experience: {
    marginTop: 4,
    fontSize: 13,
    color: '#6B7280',
  },

  row: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },

  rating: {
    fontSize: 13,
  },

  fee: {
    fontSize: 14,
    fontWeight: '700',
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontSize: 12,
    color: '#6B7280',
  },
});