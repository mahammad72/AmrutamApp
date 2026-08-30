import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  CartState,
} from '../types/cart';

const CART_STORAGE_KEY =
  '@amrutam/cart';

export const saveCart =
  async (
    state: CartState,
  ) => {
    try {
      await AsyncStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(state),
      );
    } catch (error) {
      console.warn(
        'Failed to save cart',
        error,
      );
    }
  };

export const loadCart =
  async (): Promise<
    CartState | null
  > => {
    try {
      const value =
        await AsyncStorage.getItem(
          CART_STORAGE_KEY,
        );

      if (!value) {
        return null;
      }

      return JSON.parse(value);
    } catch (error) {
      console.warn(
        'Failed to load cart',
        error,
      );

      return null;
    }
  };