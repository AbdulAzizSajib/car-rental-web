"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { CarModel } from "@/src/types/car.types";

export interface UpdateModelPayload {
  name?: string;
  brandId?: string;
}

export const updateModelAction = async (id: string, payload: UpdateModelPayload) => {
  return httpClient.put<CarModel>(`/car-models/${id}`, payload);
};
