"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { Brand } from "@/src/types/car.types";

export const getBrandByIdAction = async (id: string) => {
  return httpClient.get<Brand>(`/brands/${id}`);
};
