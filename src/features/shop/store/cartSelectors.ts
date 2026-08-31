import type { RootState } from '../../../store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectWishlist = (state: RootState) => state.cart.wishlist;

export const selectWishlistCount = (state: RootState) =>
  state.cart.wishlist.length;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

export const selectIsWishlisted = (productId: string) => (state: RootState) =>
  state.cart.wishlist.some(item => item.product.id === productId);
