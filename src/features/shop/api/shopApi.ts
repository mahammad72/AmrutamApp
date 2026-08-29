import { apiRequest } from '../../../services/api/client';
import { mockApi } from '../../../services/api/mockApi';

export const getProducts = (
  page = 1,
  limit = 20,
) => {
  return apiRequest(() =>
    mockApi.getProducts(page, limit),
  );
};