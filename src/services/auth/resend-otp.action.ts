/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "@/config/endpoints";
import { httpClient } from "@/lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { type IResendOtpPayload, resendOtpZodSchema } from "@/zod/auth.validation";

export const resendOtpAction = async (
    payload: IResendOtpPayload,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    const parsed = resendOtpZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post(endpoints.auth.resendOtp, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Resend OTP failed: ${error.message}`,
        };
    }
};
