/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "../../config/endpoints";
import { httpClient } from "../../lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "../../types/api.types";
import { type IVerifyEmailPayload, verifyEmailZodSchema } from "../../zod/auth.validation";

export const verifyEmailAction = async (
    payload: IVerifyEmailPayload,
): Promise<ApiResponse<unknown> | ApiErrorResponse> => {
    const parsed = verifyEmailZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post(endpoints.auth.verifyEmail, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Verification failed: ${error.message}`,
        };
    }
};
