"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { CarModel } from "@/src/types/car.types";

export const getModelsAction = async () => {
  return httpClient.get<CarModel[]>("/car-models");
};
