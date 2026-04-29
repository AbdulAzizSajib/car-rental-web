/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import type { IRegisterResponse } from "@/types/auth.types";
import { type IRegisterPayload, registerZodSchema } from "@/zod/auth.validation";

export const registerAction = async (
    payload: IRegisterPayload,
): Promise<ApiResponse<IRegisterResponse> | ApiErrorResponse> => {
    const parsed = registerZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post<IRegisterResponse>(endpoints.auth.register, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Registration failed: ${error.message}`,
        };
    }
};
