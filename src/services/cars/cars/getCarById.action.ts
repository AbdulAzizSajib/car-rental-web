"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { ApiCar } from "@/src/types/car.types";

export const getCarByIdAction = async (id: string) => {
  return httpClient.get<ApiCar>(`/cars/${id}`);
};
