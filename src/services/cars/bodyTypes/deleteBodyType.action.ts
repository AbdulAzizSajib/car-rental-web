"use server";

import { httpClient } from "@/src/lib/axios/httpClient";

export const deleteBodyTypeAction = async (id: string) => {
  return httpClient.delete<{ id: string }>(`/body-types/${id}`);
};
