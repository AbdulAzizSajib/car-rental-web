"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { FuelType } from "@/src/types/car.types";

export const getFuelTypesAction = async () => {
  return httpClient.get<FuelType[]>("/fuel-types", { params: { page: 1, limit: 100 } });
};
