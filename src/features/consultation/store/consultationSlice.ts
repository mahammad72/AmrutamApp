import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import type { Booking } from '../types/booking';

interface ConsultationState {
  bookings: Booking[];
}

const initialState: ConsultationState = {
  bookings: [],
};

const consultationSlice =
  createSlice({
    name: 'consultation',

    initialState,

    reducers: {
      addBooking: (
        state,
        action: PayloadAction<Booking>,
      ) => {
        state.bookings.push(
          action.payload,
        );
      },

      cancelBooking: (
        state,
        action: PayloadAction<string>,
      ) => {
        const booking =
          state.bookings.find(
            item =>
              item.id ===
              action.payload,
          );

        if (booking) {
          booking.status =
            'cancelled';
        }
      },
    },
  });

export const {
  addBooking,
  cancelBooking,
} =
  consultationSlice.actions;

export default consultationSlice.reducer;