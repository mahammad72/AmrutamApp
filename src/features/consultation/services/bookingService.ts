import type { Doctor } from '../types/doctor';
import type { Booking } from '../types/booking';

export interface CreateBookingParams {
  doctor: Doctor;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface BookingResult {
  success: boolean;
  booking?: Booking;
  error?: string;
}

/**
 * In-memory booking store.
 *
 * This simulates a backend database for the assignment.
 */
const bookings: Booking[] = [];

export const getBookings = (): Booking[] => {
  return [...bookings];
};

export const createBooking = (
  params: CreateBookingParams,
): BookingResult => {
  const {
    doctor,
    slotId,
    date,
    startTime,
    endTime,
  } = params;

  // ----------------------------------------
  // 1. Check expired slot
  // ----------------------------------------

  const slotDateTime = new Date(
    `${date}T${startTime}`,
  );

  if (
    slotDateTime.getTime() <=
    Date.now()
  ) {
    return {
      success: false,
      error: 'This slot has expired.',
    };
  }

  // ----------------------------------------
  // 2. Check double booking
  // ----------------------------------------

  const existingBooking =
    bookings.find(
      booking =>
        booking.slotId === slotId &&
        booking.status === 'confirmed',
    );

  if (existingBooking) {
    return {
      success: false,
      error:
        'This slot has already been booked.',
    };
  }

  // ----------------------------------------
  // 3. Check user time conflict
  // ----------------------------------------

  const conflictingBooking =
    bookings.find(
      booking =>
        booking.date === date &&
        booking.startTime === startTime &&
        booking.status === 'confirmed',
    );

  if (conflictingBooking) {
    return {
      success: false,
      error:
        'You already have a consultation at this time.',
    };
  }

  // ----------------------------------------
  // 4. Create booking
  // ----------------------------------------

  const booking: Booking = {
    id: `booking-${Date.now()}`,

    doctorId: doctor.id,

    doctorName: doctor.name,

    slotId,

    date,

    startTime,

    endTime,

    consultationFee:
      doctor.consultationFee,

    status: 'confirmed',

    createdAt:
      new Date().toISOString(),
  };

  bookings.push(booking);

  return {
    success: true,
    booking,
  };
};

// ----------------------------------------
// Cancel booking
// ----------------------------------------

// export const cancelBooking = (
//   bookingId: string,
// ): BookingResult => {
//   const booking =
//     bookings.find(
//       item => item.id === bookingId,
//     );

//   if (!booking) {
//     return {
//       success: false,
//       error: 'Booking not found.',
//     };
//   }

//   if (
//     booking.status === 'cancelled'
//   ) {
//     return {
//       success: false,
//       error:
//         'This booking is already cancelled.',
//     };
//   }

//   booking.status = 'cancelled';

//   return {
//     success: true,
//     booking,
//   };
// };

export const cancelBooking = (
  bookingId: string,
): BookingResult => {
  const index = bookings.findIndex(
    item => item.id === bookingId,
  );

  if (index === -1) {
    return {
      success: false,
      error: 'Booking not found.',
    };
  }

  const booking = bookings[index];

  if (booking.status === 'cancelled') {
    return {
      success: false,
      error: 'This booking is already cancelled.',
    };
  }

  const updatedBooking: Booking = {
    ...booking,
    status: 'cancelled',
  };

  bookings[index] = updatedBooking;

  return {
    success: true,
    booking: updatedBooking,
  };
};