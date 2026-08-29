import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type {
  Doctor,
  DoctorSlot,
} from '../../features/consultation/types/doctor';
import DoctorListScreen from '../../features/consultation/screens/DoctorListScreen';
import DoctorDetailsScreen from '../../features/consultation/screens/DoctorDetailScreen';
import SlotSelectionScreen from '../../features/consultation/screens/SlotSelectionScreen';
import BookingConfirmationScreen from '../../features/consultation/screens/BookingConfirmationScreen';
import UpcomingConsultationScreen from '../../features/consultation/screens/UpcomingConsultationsScreen';

export type ConsultationStackParamList = {
  DoctorList: undefined;
  DoctorDetails: {
    doctor: Doctor;
  };
  SlotSelection: {
    doctor: Doctor;
  };
  BookingConfirmation: {
    doctor: Doctor;
    slot: DoctorSlot;
  };
  UpcomingConsultation: undefined;
};

const Stack = createNativeStackNavigator<ConsultationStackParamList>();

const ConsultationNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DoctorList"
        component={DoctorListScreen}
        options={{
          title: 'Consultation',
        }}
      />
      <Stack.Screen
        name="DoctorDetails"
        component={DoctorDetailsScreen}
        options={{
          title: 'Doctor Details',
        }}
      />
      <Stack.Screen
        name="SlotSelection"
        component={SlotSelectionScreen}
        options={{
          title: 'Available Slots',
        }}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{
          title: 'Booking',
        }}
      />
      <Stack.Screen
        name="UpcomingConsultation"
        component={UpcomingConsultationScreen}
        options={{
          title: 'My Consultation',
        }}
      />
    </Stack.Navigator>
  );
};

export default ConsultationNavigator;
