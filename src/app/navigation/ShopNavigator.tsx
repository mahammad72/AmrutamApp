import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Product } from '../../features/shop/types/product';
import ProductListScreen from '../../features/shop/screens/ProductListScreen';
import ProductDetailsScreen from '../../features/shop/screens/ProductDetailsScreen';
import CartScreen from '../../features/shop/screens/CartScreen';
import WishlistScreen from '../../features/shop/screens/WishlistScreen';
import CheckoutScreen from '../../features/shop/screens/CheckoutScreen';
import OrderSuccessScreen from '../../features/shop/screens/OrderSuccessScreen';

export type ShopStackParamList = {
  ProductList: undefined;

  ProductDetails: {
    product: Product;
  };

  Cart: undefined;

  Wishlist: undefined;

  Checkout: undefined;
  OrderSuccess: undefined;
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
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Cart',
        }}
      />
      <Stack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          title: 'Wishlist',
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
        }}
      />
      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigator;
