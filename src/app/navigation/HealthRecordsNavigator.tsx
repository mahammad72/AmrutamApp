import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HealthRecordsScreen from '../../features/healthRecords/screens/HealthRecordsScreen';
import HealthRecordDetailsScreen from '../../features/healthRecords/screens/HealthRecordDetailsScreen';
import AddHealthRecordScreen from '../../features/healthRecords/screens/AddHealthRecordScreen';

const Stack = createNativeStackNavigator();

const HealthRecordsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HealthRecords"
        component={HealthRecordsScreen}
        options={{
          title: 'Health Records',
        }}
      />

      <Stack.Screen
        name="HealthRecordDetails"
        component={HealthRecordDetailsScreen}
        options={{
          title: 'Record Details',
        }}
      />
      <Stack.Screen
        name="AddHealthRecord"
        component={AddHealthRecordScreen}
        options={{
          title: 'Add Health Record',
        }}
      />
    </Stack.Navigator>
  );
};

export default HealthRecordsNavigator;
