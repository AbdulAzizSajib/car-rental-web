"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { Brand } from "@/src/types/car.types";

export const getBrandsAction = async () => {
  return httpClient.get<Brand[]>("/brands");
};
