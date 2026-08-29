import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { mockApi } from './mockApi';

import type {
  PaginationParams,
  DoctorsResponse,
  ProductsResponse,
  HealthRecordsResponse,
} from './types';
import { DoctorSlot } from '../../features/consultation/types/doctor';

export const baseApi = createApi({
  reducerPath: 'baseApi',

  baseQuery: fakeBaseQuery(),

  tagTypes: ['Doctors', 'Products', 'HealthRecords', 'Bookings'],

  endpoints: builder => ({
    // ----------------------------------------
    // Doctors
    // ----------------------------------------
    getDoctors: builder.query<DoctorsResponse, PaginationParams>({
      queryFn: async ({ page = 1, limit = 20 }) => {
        try {
          const data = await mockApi.getDoctors(page, limit);

          return {
            data,
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch doctors',
            },
          };
        }
      },

      providesTags: ['Doctors'],
    }),

    // ----------------------------------------
    // Products
    // ----------------------------------------
    getProducts: builder.query<ProductsResponse, PaginationParams>({
      queryFn: async ({ page = 1, limit = 20 }) => {
        try {
          const data = await mockApi.getProducts(page, limit);

          return {
            data,
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch products',
            },
          };
        }
      },

      providesTags: ['Products'],
    }),

    // ----------------------------------------
    // Health Records
    // ----------------------------------------
    getHealthRecords: builder.query<HealthRecordsResponse, PaginationParams>({
      queryFn: async ({ page = 1, limit = 20 }) => {
        try {
          const data = await mockApi.getHealthRecords(page, limit);

          return {
            data,
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch health records',
            },
          };
        }
      },

      providesTags: ['HealthRecords'],
    }),

    getDoctorSlots: builder.query<DoctorSlot[], string>({
      queryFn: async doctorId => {
        try {
          const data = await mockApi.getDoctorSlots(doctorId);

          return {
            data,
          };
        } catch (error) {
          return {
            error: {
              status: 500,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch slots',
            },
          };
        }
      },

      providesTags: (_result, _error, doctorId) => [
        {
          type: 'Doctors',
          id: `${doctorId}-slots`,
        },
      ],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetProductsQuery,
  useGetHealthRecordsQuery,
  useGetDoctorSlotsQuery,
} = baseApi;
