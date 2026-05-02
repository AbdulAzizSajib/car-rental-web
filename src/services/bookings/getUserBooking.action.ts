"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { Booking } from "@/src/types/booking.types";

export interface GetUserBookingParams {
  page?: number;
  limit?: number;
  status?: string;
}

export const getUserBookingAction = async (params?: GetUserBookingParams) => {
  const cleanParams: Record<string, unknown> = {};
  if (params?.page) cleanParams.page = params.page;
  if (params?.limit) cleanParams.limit = params.limit;
  if (params?.status) cleanParams.status = params.status;
  return httpClient.get<Booking[]>("/bookings/my", {
    params: cleanParams,
  });
};
