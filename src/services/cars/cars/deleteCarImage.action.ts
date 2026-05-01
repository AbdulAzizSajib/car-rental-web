"use server";

import { httpClient } from "@/src/lib/axios/httpClient";

export const deleteCarImageAction = async (imageId: string) => {
  return httpClient.delete<{ id: string }>(`/cars/images/${imageId}`);
};
