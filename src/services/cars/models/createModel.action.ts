"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { CarModel } from "@/src/types/car.types";

export interface CreateModelPayload {
  name: string;
  brandId: string;
}

export const createModelAction = async (payload: CreateModelPayload) => {
  return httpClient.post<CarModel>("/car-models", payload);
};
