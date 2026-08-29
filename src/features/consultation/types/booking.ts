export type BookingStatus =
  | 'confirmed'
  | 'cancelled';

export interface Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  slotId: string;
  date: string;
  startTime: string;
  endTime: string;
  consultationFee: number;
  status: BookingStatus;
  createdAt: string;
}