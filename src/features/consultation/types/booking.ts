export type BookingStatus =
  | 'upcoming'
  | 'completed'
  | 'cancelled'
  | 'pending-sync';

export interface Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  createdAt: string;
}