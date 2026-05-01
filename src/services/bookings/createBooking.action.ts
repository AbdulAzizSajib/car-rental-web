"use server";

import { httpClient } from "@/src/lib/axios/httpClient";

export interface CreateBookingPayload {
  carId: string;
  pickupLocation: string;
  dropLocation: string;
  startDate: string;
  endDate: string;
  tripType: "ONE_WAY" | "ROUND_TRIP";
  contactNumber: string;
  specialRequest?: string;
}

export const createBookingAction = async (payload: CreateBookingPayload) => {
  return httpClient.post("/bookings", payload);
};
