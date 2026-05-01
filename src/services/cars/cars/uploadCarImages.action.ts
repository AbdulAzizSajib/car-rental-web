"use server";

import { httpClient } from "@/src/lib/axios/httpClient";

export interface CarImage {
  id: string;
  url: string;
  carId: string;
  isPrimary: boolean;
}

export const uploadCarImagesAction = async (carId: string, formData: FormData) => {
  return httpClient.post<CarImage[]>(`/cars/${carId}/images`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
