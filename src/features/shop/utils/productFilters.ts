import type {
  Product,
  ProductFilters,
} from '../types/product';

export const filterProducts = (
  products: Product[],
  filters: ProductFilters,
): Product[] => {
  let result = [...products];

  // Search
  if (filters.search.trim()) {
    const search =
      filters.search
        .trim()
        .toLowerCase();

    result = result.filter(
      product =>
        product.name
          .toLowerCase()
          .includes(search) ||
        product.description
          .toLowerCase()
          .includes(search),
    );
  }

  // Category
  if (
    filters.categories.length > 0
  ) {
    result = result.filter(
      product =>
        filters.categories.includes(
          product.category,
        ),
    );
  }

  // Minimum price
  if (
    filters.minPrice !== undefined
  ) {
    result = result.filter(
      product =>
        product.price >=
        filters.minPrice!,
    );
  }

  // Maximum price
  if (
    filters.maxPrice !== undefined
  ) {
    result = result.filter(
      product =>
        product.price <=
        filters.maxPrice!,
    );
  }

  // Rating
  if (
    filters.minRating !== undefined
  ) {
    result = result.filter(
      product =>
        product.rating >=
        filters.minRating!,
    );
  }

  // Sorting
  switch (filters.sort) {
    case 'price_low_high':
      result.sort(
        (a, b) =>
          a.price - b.price,
      );
      break;

    case 'price_high_low':
      result.sort(
        (a, b) =>
          b.price - a.price,
      );
      break;

    case 'rating':
      result.sort(
        (a, b) =>
          b.rating - a.rating,
      );
      break;

    case 'newest':
      result.reverse();
      break;

    default:
      break;
  }

  return result;
};