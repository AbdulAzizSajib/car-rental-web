"use server";

import { httpClient } from "@/src/lib/axios/httpClient";

export const deleteBrandAction = async (id: string) => {
  return httpClient.delete<{ id: string }>(`/brands/${id}`);
};
