"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { Booking } from "@/src/types/booking.types";

export const cancelBookingAction = async (bookingId: string) => {
  return httpClient.patch<Booking>(`/bookings/${bookingId}/cancel`, {});
};
