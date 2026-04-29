/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { forgetPasswordZodSchema, type IForgetPasswordPayload } from "@/zod/auth.validation";

export const forgetPasswordAction = async (
    payload: IForgetPasswordPayload,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    const parsed = forgetPasswordZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post(endpoints.auth.forgetPassword, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Request failed: ${error.message}`,
        };
    }
};
