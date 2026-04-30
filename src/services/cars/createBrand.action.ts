"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { Brand } from "@/src/types/car.types";

export interface CreateBrandPayload {
  name: string;
  logo?: string;
}

export const createBrandAction = async (payload: CreateBrandPayload) => {
  return httpClient.post<Brand>("/brands", payload);
};
