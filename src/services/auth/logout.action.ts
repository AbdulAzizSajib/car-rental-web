/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TOKEN_KEYS } from "../../config/constants";
import { endpoints } from "../../config/endpoints";
import { deleteCookie } from "../../lib/cookieUtils";
import { httpClient } from "../../lib/axios/httpClient";

export const logoutAction = async (): Promise<{ success: boolean; message: string }> => {
    try {
        await httpClient.post(endpoints.auth.logout, {});
    } catch (error: any) {
        console.error("Logout request failed:", error?.message);
    } finally {
        await deleteCookie(TOKEN_KEYS.ACCESS);
        await deleteCookie(TOKEN_KEYS.REFRESH);
        await deleteCookie(TOKEN_KEYS.SESSION);
    }

    return { success: true, message: "Logged out" };
};
