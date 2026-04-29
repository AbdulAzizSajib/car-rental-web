/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { changePasswordZodSchema, type IChangePasswordPayload } from "@/zod/auth.validation";

export const changePasswordAction = async (
    payload: IChangePasswordPayload,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    const parsed = changePasswordZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post(endpoints.auth.changePassword, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Change password failed: ${error.message}`,
        };
    }
};
