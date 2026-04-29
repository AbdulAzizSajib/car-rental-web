"use server";

import { TOKEN_KEYS } from "../../config/constants";
import { endpoints } from "../../config/endpoints";
import { setTokenInCookies } from "../../lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getNewTokensWithRefreshToken(refreshToken: string): Promise<boolean> {
    try {
        const res = await fetch(`${BASE_API_URL}${endpoints.auth.refreshToken}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: `${TOKEN_KEYS.REFRESH}=${refreshToken}`,
            },
        });

        if (!res.ok) return false;

        const { data } = await res.json();
        const { accessToken, refreshToken: newRefreshToken, token } = data ?? {};

        if (accessToken) await setTokenInCookies(TOKEN_KEYS.ACCESS, accessToken);
        if (newRefreshToken) await setTokenInCookies(TOKEN_KEYS.REFRESH, newRefreshToken);
        if (token) await setTokenInCookies(TOKEN_KEYS.SESSION, token, 24 * 60 * 60);

        return true;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return false;
    }
}
