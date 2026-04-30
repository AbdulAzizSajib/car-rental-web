"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { BodyType } from "@/src/types/car.types";

export const getBodyTypesAction = async () => {
  return httpClient.get<BodyType[]>("/body-types", { params: { page: 1, limit: 100 } });
};
