// bookingUtils.ts
import type { DoctorSlot } from '../types/doctor';

export const isSlotExpired = (
  slot: DoctorSlot,
): boolean => {
  const slotDateTime = new Date(
    `${slot.date}T${slot.startTime}`,
  );

  return slotDateTime.getTime() <= Date.now();
};

export const isSlotAvailable = (
  slot: DoctorSlot,
): boolean => {
  if (slot.isBooked) {
    return false;
  }

  if (isSlotExpired(slot)) {
    return false;
  }

  return true;
};