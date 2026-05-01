"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { BodyType } from "@/src/types/car.types";

export interface CreateBodyTypePayload {
  name: string;
  image?: string;
}

export const createBodyTypeAction = async (payload: CreateBodyTypePayload) => {
  return httpClient.post<BodyType>("/body-types", payload);
};
