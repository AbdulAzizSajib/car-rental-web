"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { ApiCar, CarsFilterParams } from "@/src/types/car.types";

export const getCarsAction = async (params?: CarsFilterParams) => {
  const cleanParams: Record<string, unknown> = {};
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "" && value !== null) {
        cleanParams[key] = value;
      }
    }
  }
  return httpClient.get<ApiCar[]>("/cars", { params: cleanParams });
};
