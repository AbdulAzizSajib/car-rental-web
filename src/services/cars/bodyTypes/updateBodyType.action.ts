"use server";

import { httpClient } from "@/src/lib/axios/httpClient";
import { BodyType } from "@/src/types/car.types";

export interface UpdateBodyTypePayload {
  name?: string;
  image?: string;
}

export const updateBodyTypeAction = async (
  id: string,
  payload: UpdateBodyTypePayload,
) => {
  return httpClient.put<BodyType>(`/body-types/${id}`, payload);
};
