import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { MainTabParamList } from './types';
import ConsultationNavigator from './ConsultationNavigator';
import ShopNavigator from './ShopNavigator';
import HealthRecordsNavigator from './HealthRecordsNavigator';

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
        component={ShopNavigator}
         options={{
          headerShown:false
        }}
      />

      <Tab.Screen
        name="HealthRecords"
        component={HealthRecordsNavigator}
         options={{
          headerShown:false
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;