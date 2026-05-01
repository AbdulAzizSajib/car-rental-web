"use server";

import { httpClient } from "@/src/lib/axios/httpClient";

export const deleteModelAction = async (id: string) => {
  return httpClient.delete<{ id: string }>(`/car-models/${id}`);
};
