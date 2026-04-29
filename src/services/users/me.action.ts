"use server";

import { TOKEN_KEYS } from "../../config/constants";
import { endpoints } from "../../config/endpoints";
import type { IAuthUser } from "../../types/auth.types";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export async function getUserInfo(): Promise<IAuthUser | null> {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(TOKEN_KEYS.ACCESS)?.value;
        const sessionToken = cookieStore.get(TOKEN_KEYS.SESSION)?.value;

        if (!accessToken) return null;

        const res = await fetch(`${BASE_API_URL}${endpoints.auth.me}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `${TOKEN_KEYS.ACCESS}=${accessToken}; ${TOKEN_KEYS.SESSION}=${sessionToken}`,
            },
        });

        if (!res.ok) {
            console.error("Failed to fetch user info:", res.status, res.statusText);
            return null;
        }

        const { data } = await res.json();
        return data as IAuthUser;
    } catch (error) {
        console.error("Error fetching user info:", error);
        return null;
    }
}
