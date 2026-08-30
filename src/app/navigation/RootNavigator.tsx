import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigator from './MainNavigator';
import  CartPersistence from '../../features/shop/store/CartPersistencee';

const RootNavigator = () => {
  return (
    <>
      <CartPersistence />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </>
  );
};

export default RootNavigator;
