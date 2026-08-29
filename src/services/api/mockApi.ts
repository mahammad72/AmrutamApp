import {
  generateDoctors,
  generateProducts,
  generateHealthRecords,
} from './mockData';

import { Doctor } from '../../features/consultation/types/doctor';
import { Product } from '../../features/shop/types/product';
import { HealthRecord } from '../../features/healthRecords/types/record';

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

const paginate = <T>(
  data: T[],
  page: number,
  limit: number,
): PaginatedResponse<T> => {
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: data.slice(start, end),
    page,
    limit,
    total: data.length,
    hasNextPage: end < data.length,
  };
};

export const mockApi = {
  async getDoctors(
    page = 1,
    limit = 20,
  ): Promise<PaginatedResponse<Doctor>> {
    const doctors = generateDoctors(5000);

    return paginate(doctors, page, limit);
  },

  async getProducts(
    page = 1,
    limit = 20,
  ): Promise<PaginatedResponse<Product>> {
    const products = generateProducts(20000);

    return paginate(products, page, limit);
  },

  async getHealthRecords(
    page = 1,
    limit = 20,
  ): Promise<PaginatedResponse<HealthRecord>> {
    const records = generateHealthRecords(10000);

    return paginate(records, page, limit);
  },
};