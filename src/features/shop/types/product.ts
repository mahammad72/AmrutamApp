export type ProductCategory =
  | 'Herbal'
  | 'Supplements'
  | 'Oils'
  | 'Skin Care'
  | 'Hair Care'
  | 'Digestive Care';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  image: string;
  inStock: boolean;
  tags: string[];
}

export type ProductSort =
  | 'relevance'
  | 'price_low_high'
  | 'price_high_low'
  | 'rating'
  | 'newest';

export interface ProductFilters {
  search: string;
  categories: ProductCategory[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sort: ProductSort;
}