"use server";

import { httpClient } from "@/src/lib/axios/httpClient";

export interface CarImage {
  id: string;
  url: string;
  carId: string;
  isPrimary: boolean;
}

export const setCarImagePrimaryAction = async (imageId: string) => {
  return httpClient.patch<CarImage>(`/cars/images/${imageId}/primary`, {});
};
