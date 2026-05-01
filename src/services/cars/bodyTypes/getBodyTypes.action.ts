"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { BodyType } from "@/src/types/car.types";

export interface GetBodyTypesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const getBodyTypesAction = async (params?: GetBodyTypesParams) => {
  const cleanParams: Record<string, unknown> = {};
  if (params?.page) cleanParams.page = params.page;
  if (params?.limit) cleanParams.limit = params.limit;
  if (params?.search) cleanParams.search = params.search;
  return httpClient.get<BodyType[]>("/body-types", { params: cleanParams });
};
