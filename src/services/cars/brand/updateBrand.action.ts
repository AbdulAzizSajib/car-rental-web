"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { Brand } from "@/src/types/car.types";

export interface UpdateBrandPayload {
  name?: string;
  logo?: string;
}

export const updateBrandAction = async (id: string, payload: UpdateBrandPayload) => {
  return httpClient.put<Brand>(`/brands/${id}`, payload);
};
