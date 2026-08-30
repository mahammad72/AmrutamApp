import {
  generateDoctorsPage,
  generateHealthRecordsPage,
  generateDoctorSlots,
  ALL_PRODUCTS,
} from './mockData';

import type { PaginatedResponse } from './types';

import type { Booking } from '../../features/consultation/types/booking';

import type { DoctorSlot } from '../../features/consultation/types/doctor';

import type { Doctor } from '../../features/consultation/types/doctor';

import type {
  ProductCategory,
  ProductSort,
} from '../../features/shop/types/product';

// ----------------------------------------
// ProductQueryParams interface
// ----------------------------------------

export interface ProductQueryParams {
  page?: number;
  limit?: number;

  search?: string;

  categories?: ProductCategory[];

  minPrice?: number;

  maxPrice?: number;

  minRating?: number;

  sort?: ProductSort;
}
// ----------------------------------------
// Simulated backend storage
// ----------------------------------------

const bookings: Booking[] = [];

// ----------------------------------------
// Pagination
// ----------------------------------------

const createPagination = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
): PaginatedResponse<T> => ({
  data,
  page,
  limit,
  total,
  hasNextPage: page * limit < total,
});

// ----------------------------------------
// Mock API
// ----------------------------------------

export const mockApi = {
  // --------------------------------------
  // Doctors
  // --------------------------------------

  async getDoctors(page = 1, limit = 20) {
    const data = generateDoctorsPage(page, limit);

    return createPagination(data, page, limit, 5000);
  },

  // --------------------------------------
  // Products
  // --------------------------------------

  async getProducts({
    page = 1,
    limit = 20,
    search = '',
    categories = [],
    minPrice,
    maxPrice,
    minRating,
    sort = 'relevance',
  }: ProductQueryParams = {}) {
    let result = ALL_PRODUCTS;

    // ------------------------------------
    // Search
    // ------------------------------------

    if (search.trim()) {
      const searchTerm = search.trim().toLowerCase();

      result = result.filter(
        product =>
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm),
      );
    }

    // ------------------------------------
    // Category filter
    // ------------------------------------

    if (categories.length > 0) {
      result = result.filter(product => categories.includes(product.category));
    }

    // ------------------------------------
    // Minimum price
    // ------------------------------------

    if (minPrice !== undefined) {
      result = result.filter(product => product.price >= minPrice);
    }

    // ------------------------------------
    // Maximum price
    // ------------------------------------

    if (maxPrice !== undefined) {
      result = result.filter(product => product.price <= maxPrice);
    }

    // ------------------------------------
    // Rating
    // ------------------------------------

    if (minRating !== undefined) {
      result = result.filter(product => product.rating >= minRating);
    }

    // ------------------------------------
    // Sorting
    // ------------------------------------

    switch (sort) {
      case 'price_low_high':
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case 'price_high_low':
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;

      case 'newest':
        result = [...result].reverse();
        break;

      default:
        break;
    }

    // ------------------------------------
    // Pagination
    // ------------------------------------

    const total = result.length;

    const start = (page - 1) * limit;

    const end = start + limit;

    const data = result.slice(start, end);

    return createPagination(data, page, limit, total);
  },

  // --------------------------------------
  // Health Records
  // --------------------------------------

  async getHealthRecords(page = 1, limit = 20) {
    const data = generateHealthRecordsPage(page, limit);

    return createPagination(data, page, limit, 10000);
  },

  // --------------------------------------
  // Doctor Slots
  // --------------------------------------

  async getDoctorSlots(doctorId: string): Promise<DoctorSlot[]> {
    const slots = generateDoctorSlots(doctorId);

    return slots.map(slot => ({
      ...slot,

      isBooked: bookings.some(
        booking => booking.slotId === slot.id && booking.status === 'confirmed',
      ),
    }));
  },

  // --------------------------------------
  // Create Booking
  // --------------------------------------

  async createBooking(params: { doctor: Doctor; slot: DoctorSlot }) {
    const { doctor, slot } = params;

    // Check if slot is expired
    const slotDateTime = new Date(`${slot.date}T${slot.startTime}`);

    if (slotDateTime.getTime() <= Date.now()) {
      throw new Error('This slot has expired.');
    }

    // Check double booking
    const alreadyBooked = bookings.some(
      booking => booking.slotId === slot.id && booking.status === 'confirmed',
    );

    if (alreadyBooked) {
      throw new Error('This slot has already been booked.');
    }

    // Check user's time conflict
    const timeConflict = bookings.some(
      booking =>
        booking.date === slot.date &&
        booking.startTime === slot.startTime &&
        booking.status === 'confirmed',
    );

    if (timeConflict) {
      throw new Error('You already have a consultation at this time.');
    }

    const booking: Booking = {
      id: `booking-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,

      doctorId: doctor.id,

      doctorName: doctor.name,

      slotId: slot.id,

      date: slot.date,

      startTime: slot.startTime,

      endTime: slot.endTime,

      consultationFee: doctor.consultationFee,

      status: 'confirmed',

      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    return booking;
  },

  // --------------------------------------
  // Upcoming Bookings
  // --------------------------------------

  async getUpcomingBookings(): Promise<Booking[]> {
    return bookings.filter(booking => booking.status === 'confirmed');
  },

  // --------------------------------------
  // Cancel Booking
  // --------------------------------------

  async cancelBooking(bookingId: string) {
    const booking = bookings.find(item => item.id === bookingId);

    if (!booking) {
      throw new Error('Booking not found.');
    }

    if (booking.status === 'cancelled') {
      throw new Error('Booking is already cancelled.');
    }

    booking.status = 'cancelled';

    return booking;
  },
};
