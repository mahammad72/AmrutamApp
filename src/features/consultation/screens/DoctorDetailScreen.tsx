import React from 'react';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type {
  ConsultationStackParamList,
} from '../../../app/navigation/ConsultationNavigator';

type Props =
  NativeStackScreenProps<
    ConsultationStackParamList,
    'DoctorDetails'
  >;

const DoctorDetailsScreen = ({
  route,
  navigation
}: Props) => {
  const { doctor } = route.params;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Image
        source={{ uri: doctor.avatar }}
        style={styles.avatar}
      />

      <Text style={styles.name}>
        {doctor.name}
      </Text>

      <Text style={styles.specialization}>
        {doctor.specialization}
      </Text>

      <View style={styles.info}>
        <Text>
          ⭐ {doctor.rating} Rating
        </Text>

        <Text>
          {doctor.experience} years experience
        </Text>

        <Text>
          Consultation ₹
          {doctor.consultationFee}
        </Text>
      </View>

      <Pressable
  style={styles.button}
  onPress={() =>
    navigation.navigate(
      'SlotSelection',
      { doctor },
    )
  }
>
  <Text style={styles.buttonText}>
    View Available Slots
  </Text>
</Pressable>

      <Text style={styles.heading}>
        Languages
      </Text>

      <Text style={styles.body}>
        {doctor.languages.join(', ')}
      </Text>
    </ScrollView>
  );
};

export default DoctorDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  name: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '700',
  },

  specialization: {
    marginTop: 6,
    color: '#4F6F52',
    fontSize: 16,
  },

  info: {
    width: '100%',
    gap: 12,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },

  heading: {
    width: '100%',
    marginTop: 24,
    fontSize: 18,
    fontWeight: '700',
  },

  body: {
    width: '100%',
    marginTop: 8,
    color: '#6B7280',
  },

  button: {
  width: '100%',
  marginTop: 30,
  padding: 16,
  borderRadius: 12,
  alignItems: 'center',
  backgroundColor: '#4F6F52',
},

buttonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '700',
},
});