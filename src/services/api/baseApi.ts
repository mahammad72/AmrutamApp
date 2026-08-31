import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';

import { mockApi, ProductQueryParams } from './mockApi';

import type {
  PaginationParams,
  DoctorsResponse,
  ProductsResponse,
  HealthRecordsResponse,
} from './types';

import type {
  Doctor,
  DoctorSlot,
} from '../../features/consultation/types/doctor';

import type { Booking } from '../../features/consultation/types/booking';
import type { HealthRecord } from '../../features/healthRecords/types/healthRecord';

interface PaginatedParams {
  page?: number;
  limit?: number;
}

export const baseApi = createApi({
  reducerPath: 'baseApi',

  baseQuery: fakeBaseQuery(),

  tagTypes: ['Doctors', 'Products', 'HealthRecords', 'Bookings'],

  endpoints: builder => ({
    // ========================================
    // Doctors
    // ========================================

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

    // ========================================
    // Products
    // ========================================

    getProducts: builder.query<ProductsResponse, ProductQueryParams>({
      queryFn: async params => {
        try {
          const data = await mockApi.getProducts(params);

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

    // ========================================
    // Health Records
    // ========================================

    getHealthRecords: builder.query<HealthRecordsResponse, PaginatedParams>({
      queryFn: async ({ page = 1, limit = 20 }) => {
        try {
          const data = await mockApi.getHealthRecords(page, limit);

          return {
            data,
          };
        } catch (error: any) {
          return {
            error: {
              status: 500,
              message: error.message,
            },
          };
        }
      },

      providesTags: ['HealthRecords'],
    }),

    // ========================================
    // Doctor Slots
    // ========================================

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

    // ========================================
    // Create Booking
    // ========================================

    createBooking: builder.mutation<
      Booking,
      {
        doctor: Doctor;
        slot: DoctorSlot;
      }
    >({
      queryFn: async ({ doctor, slot }) => {
        try {
          const data = await mockApi.createBooking({
            doctor,
            slot,
          });

          return {
            data,
          };
        } catch (error) {
          return {
            error: {
              status: 409,
              error: error instanceof Error ? error.message : 'Booking failed',
            },
          };
        }
      },

      invalidatesTags: ['Bookings', 'Doctors'],
    }),

    // ========================================
    // Upcoming Bookings
    // ========================================

    getUpcomingBookings: builder.query<Booking[], void>({
      queryFn: async () => {
        try {
          const data = await mockApi.getUpcomingBookings();

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
                  : 'Failed to fetch bookings',
            },
          };
        }
      },

      providesTags: ['Bookings'],
    }),

    // ========================================
    // Cancel Booking
    // ========================================

    cancelBooking: builder.mutation<Booking, string>({
      queryFn: async bookingId => {
        try {
          const data = await mockApi.cancelBooking(bookingId);

          return {
            data,
          };
        } catch (error) {
          return {
            error: {
              status: 409,
              error:
                error instanceof Error ? error.message : 'Cancellation failed',
            },
          };
        }
      },

      invalidatesTags: ['Bookings', 'Doctors'],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetProductsQuery,
  useGetHealthRecordsQuery,
  useGetDoctorSlotsQuery,
  useCreateBookingMutation,
  useGetUpcomingBookingsQuery,
  useCancelBookingMutation,
} = baseApi;
