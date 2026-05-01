"use server";

import { httpClient } from "@/src/lib/axios/httpClient";

export const deleteCarAction = async (id: string) => {
  return httpClient.delete<{ id: string }>(`/cars/${id}`);
};
