import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { MainTabParamList } from './types';
import ConsultationNavigator from './ConsultationNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Consultation"
        component={ConsultationNavigator}
        options={{
          headerShown:false
        }}
      />

      <Tab.Screen
        name="Shop"
        component={() => null}
         options={{
          headerShown:false
        }}
      />

      <Tab.Screen
        name="HealthRecords"
        component={() => null}
         options={{
          headerShown:false
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;