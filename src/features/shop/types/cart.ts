import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: number;
}

export interface CartState {
  items: CartItem[];

  wishlist: WishlistItem[];
}
