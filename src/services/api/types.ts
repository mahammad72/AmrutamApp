

import type { Doctor } from '../../features/consultation/types/doctor';
import type { Product } from '../../features/shop/types/product';
import type { HealthRecord } from '../../features/healthRecords/types/record';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  status: number;
  message: string;
}

export type DoctorsResponse = PaginatedResponse<Doctor>;
export type ProductsResponse = PaginatedResponse<Product>;
export type HealthRecordsResponse = PaginatedResponse<HealthRecord>;