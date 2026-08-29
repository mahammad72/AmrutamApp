export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  inStock: boolean;
  tags: string[];
}