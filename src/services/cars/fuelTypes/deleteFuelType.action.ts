"use server";

import { httpClient } from "@/src/lib/axios/httpClient";

export const deleteFuelTypeAction = async (id: string) => {
  return httpClient.delete<{ id: string }>(`/fuel-types/${id}`);
};
