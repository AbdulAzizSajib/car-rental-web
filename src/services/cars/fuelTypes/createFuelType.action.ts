"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { FuelType } from "@/src/types/car.types";

export interface CreateFuelTypePayload {
  name: string;
  image?: string;
}

export const createFuelTypeAction = async (payload: CreateFuelTypePayload) => {
  return httpClient.post<FuelType>("/fuel-types", payload);
};
