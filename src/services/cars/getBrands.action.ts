"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { Brand } from "@/src/types/car.types";

export interface GetBrandsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getBrandsAction = async (params?: GetBrandsParams) => {
  const cleanParams: Record<string, unknown> = {};
  if (params?.page) cleanParams.page = params.page;
  if (params?.limit) cleanParams.limit = params.limit;
  if (params?.search) cleanParams.search = params.search;
  return httpClient.get<Brand[]>("/brands", { params: cleanParams });
};
