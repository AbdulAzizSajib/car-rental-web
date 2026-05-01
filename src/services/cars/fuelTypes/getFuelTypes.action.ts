"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { FuelType } from "@/src/types/car.types";

export interface GetFuelTypesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getFuelTypesAction = async (params?: GetFuelTypesParams) => {
  const cleanParams: Record<string, unknown> = {};
  if (params?.page) cleanParams.page = params.page;
  if (params?.limit) cleanParams.limit = params.limit;
  if (params?.search) cleanParams.search = params.search;
  return httpClient.get<FuelType[]>("/fuel-types", { params: cleanParams });
};
