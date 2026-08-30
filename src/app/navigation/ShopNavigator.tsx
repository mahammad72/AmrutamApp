import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Product } from '../../features/shop/types/product';
import ProductListScreen from '../../features/shop/screens/ProductListScreen';
import ProductDetailsScreen from '../../features/shop/screens/ProductDetailsScreen';



export type ShopStackParamList = {
  ProductList: undefined;

  ProductDetails: {
    product: Product;
  };

  Cart: undefined;

  Wishlist: undefined;

  Checkout: undefined;
};

const Stack = createNativeStackNavigator<ShopStackParamList>();

const ShopNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{
          title: 'Shop',
        }}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          title: 'Product Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigator;
