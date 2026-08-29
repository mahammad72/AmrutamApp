import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Consultation"
        component={() => null}
      />

      <Tab.Screen
        name="Shop"
        component={() => null}
      />

      <Tab.Screen
        name="HealthRecords"
        component={() => null}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;