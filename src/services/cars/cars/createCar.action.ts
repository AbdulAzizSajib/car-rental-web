"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { ApiCar } from "@/src/types/car.types";

export interface CreateCarPayload {
  name: string;
  brandId: string;
  modelId: string;
  year: number;
  bodyTypeId: string;
  pricePerDay: number;
  rentalType: "ANY" | "PER_DAY" | "PER_HOUR";
  seats: number;
  transmission: "AUTOMATIC" | "MANUAL";
  fuelTypeId: string;
  mileage: number;
  engineCapacity?: number;
  color?: string;
  registrationNo?: string;
  location: string;
  isAC?: boolean;
  isWithDriver?: boolean;
  isAvailable?: boolean;
}

export const createCarAction = async (payload: CreateCarPayload) => {
  return httpClient.post<ApiCar>("/cars/create", payload);
};
