"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { FuelType } from "@/src/types/car.types";

export interface UpdateFuelTypePayload {
  name?: string;
  image?: string;
}

export const updateFuelTypeAction = async (
  id: string,
  payload: UpdateFuelTypePayload,
) => {
  return httpClient.put<FuelType>(`/fuel-types/${id}`, payload);
};
