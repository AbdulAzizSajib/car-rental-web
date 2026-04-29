/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { type IResetPasswordPayload, resetPasswordZodSchema } from "@/zod/auth.validation";

export const resetPasswordAction = async (
    payload: IResetPasswordPayload,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    const parsed = resetPasswordZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post(endpoints.auth.resetPassword, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Reset password failed: ${error.message}`,
        };
    }
};
