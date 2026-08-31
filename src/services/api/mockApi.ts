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

import type { HealthRecord } from '../../features/healthRecords/types/healthRecord';

let healthRecords: HealthRecord[] = [
  {
    id: 'hr-001',
    title: 'Complete Blood Count',
    description: 'Routine blood examination.',
    type: 'lab_report',
    date: '2026-08-20',
    doctorName: 'Dr. Rahul Sharma',
    hospitalName: 'Amrutam Wellness Center',
    tags: ['Blood Test', 'Routine'],
    attachments: [
      {
        id: 'att-001',
        name: 'cbc-report.pdf',
        uri: 'https://example.com/cbc-report.pdf',
        type: 'pdf',
      },
    ],
    createdAt: '2026-08-20T10:30:00Z',
  },

  {
    id: 'hr-002',
    title: 'Ayurvedic Prescription',
    description: 'Prescription after consultation.',
    type: 'prescription',
    date: '2026-08-15',
    doctorName: 'Dr. Amit Patel',
    hospitalName: 'Amrutam Ayurveda',
    tags: ['Ayurveda', 'Prescription'],
    attachments: [
      {
        id: 'att-002',
        name: 'prescription.jpg',
        uri: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
        type: 'image',
      },
    ],
    createdAt: '2026-08-15T09:20:00Z',
  },

  {
    id: 'hr-003',
    title: 'General Consultation',
    description: 'Follow-up consultation.',
    type: 'consultation',
    date: '2026-07-25',
    doctorName: 'Dr. Neha Shah',
    hospitalName: 'Amrutam Wellness Center',
    tags: ['Follow Up', 'General'],
    attachments: [],
    createdAt: '2026-07-25T11:00:00Z',
  },

  {
    id: 'hr-004',
    title: 'COVID-19 Vaccination',
    description: 'Vaccination record.',
    type: 'vaccination',
    date: '2026-07-12',
    tags: ['Vaccination', 'COVID-19'],
    attachments: [],
    createdAt: '2026-07-12T08:30:00Z',
  },

  {
    id: 'hr-005',
    title: 'Medicine Allergy',
    description: 'Reported allergy to a medicine.',
    type: 'allergy',
    date: '2026-06-18',
    doctorName: 'Dr. Priya Mehta',
    tags: ['Allergy', 'Medicine'],
    attachments: [],
    createdAt: '2026-06-18T13:00:00Z',
  },
];

export const getHealthRecords = async (page = 1, limit = 20) => {
  const start = (page - 1) * limit;

  const end = start + limit;

  return healthRecords.slice(start, end);
};

export const createHealthRecord = async (
  record: Omit<HealthRecord, 'id' | 'createdAt'>,
): Promise<HealthRecord> => {
  const newRecord: HealthRecord = {
    ...record,

    id: `hr-${Date.now()}`,

    createdAt: new Date().toISOString(),
  };

  healthRecords = [newRecord, ...healthRecords];

  return newRecord;
};

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
  async createHealthRecord(params: Omit<HealthRecord, 'id' | 'createdAt'>) {
    const now = new Date().toISOString();

    const newRecord: HealthRecord = {
      ...params,

      id: `health-${Date.now()}`,
      createdAt: now,
    };

    healthRecords.unshift(newRecord);

    return newRecord;
  },
};
