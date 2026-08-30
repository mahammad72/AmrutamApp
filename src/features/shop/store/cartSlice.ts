import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import type {
  CartItem,
  CartState,
} from '../types/cart';

import type {
  Product,
} from '../types/product';

const initialState: CartState = {
  items: [],
  wishlist: [],
};

const cartSlice =
  createSlice({
    name: 'cart',

    initialState,

    reducers: {
      // ==================================
      // Add product
      // ==================================

      addToCart: (
        state,
        action: PayloadAction<Product>,
      ) => {
        const product =
          action.payload;

        const existingItem =
          state.items.find(
            item =>
              item.product.id ===
              product.id,
          );

        if (existingItem) {
          existingItem.quantity += 1;
          return;
        }

        state.items.push({
          product,
          quantity: 1,
        });
      },

      // ==================================
      // Increase quantity
      // ==================================

      increaseQuantity: (
        state,
        action: PayloadAction<string>,
      ) => {
        const item =
          state.items.find(
            item =>
              item.product.id ===
              action.payload,
          );

        if (item) {
          item.quantity += 1;
        }
      },

      // ==================================
      // Decrease quantity
      // ==================================

      decreaseQuantity: (
        state,
        action: PayloadAction<string>,
      ) => {
        const item =
          state.items.find(
            item =>
              item.product.id ===
              action.payload,
          );

        if (!item) {
          return;
        }

        if (item.quantity <= 1) {
          state.items =
            state.items.filter(
              cartItem =>
                cartItem.product.id !==
                action.payload,
            );

          return;
        }

        item.quantity -= 1;
      },

      // ==================================
      // Remove item
      // ==================================

      removeFromCart: (
        state,
        action: PayloadAction<string>,
      ) => {
        state.items =
          state.items.filter(
            item =>
              item.product.id !==
              action.payload,
          );
      },

      // ==================================
      // Clear cart
      // ==================================

      clearCart: state => {
        state.items = [];
      },

      // ==================================
      // Wishlist toggle
      // ==================================

      toggleWishlist: (
        state,
        action: PayloadAction<string>,
      ) => {
        const productId =
          action.payload;

        const exists =
          state.wishlist.includes(
            productId,
          );

        if (exists) {
          state.wishlist =
            state.wishlist.filter(
              id =>
                id !== productId,
            );
        } else {
          state.wishlist.push(
            productId,
          );
        }
      },

      // ==================================
      // Restore persisted state
      // ==================================

      hydrateCart: (
        state,
        action: PayloadAction<CartState>,
      ) => {
        state.items =
          action.payload.items ?? [];

        state.wishlist =
          action.payload.wishlist ?? [];
      },
    },
  });

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  toggleWishlist,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;