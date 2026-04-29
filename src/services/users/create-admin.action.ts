/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { endpoints } from "../../config/endpoints";
import { httpClient } from "../../lib/axios/httpClient";
import type { ApiErrorResponse, ApiResponse } from "../../types/api.types";
import type { IAuthUser } from "../../types/auth.types";
import { createAdminZodSchema, type ICreateAdminPayload } from "../../zod/user.validation";

export const createAdminAction = async (
    payload: ICreateAdminPayload,
): Promise<ApiResponse<IAuthUser> | ApiErrorResponse> => {
    const parsed = createAdminZodSchema.safeParse(payload);
    if (!parsed.success) {
        return { success: false, message: parsed.error.issues[0]?.message ?? "Invalid input" };
    }

    try {
        return await httpClient.post<IAuthUser>(endpoints.users.createAdmin, parsed.data);
    } catch (error: any) {
        return {
            success: false,
            message: error?.response?.data?.message ?? `Create admin failed: ${error.message}`,
        };
    }
};
