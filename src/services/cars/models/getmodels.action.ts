"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { CarModel } from "@/src/types/car.types";

export interface GetModelsParams {
  page?: number;
  limit?: number;
  search?: string;
  brandId?: string;
}

export const getModelsAction = async (params?: GetModelsParams) => {
  const cleanParams: Record<string, unknown> = {};
  if (params?.page) cleanParams.page = params.page;
  if (params?.limit) cleanParams.limit = params.limit;
  if (params?.search) cleanParams.search = params.search;
  if (params?.brandId) cleanParams.brandId = params.brandId;
  return httpClient.get<CarModel[]>("/car-models", { params: cleanParams });
};
