"use server";

import { endpoints } from "@/config/endpoints";
import type { ApiResponse } from "@/types/api.types";
import type { IAuthUser } from "@/types/auth.types";
import { cookies } from "next/headers";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const updateMyProfileAction = async (
    formData: FormData,
): Promise<ApiResponse<IAuthUser>> => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

    const res = await fetch(`${BASE_API_URL}${endpoints.users.me}`, {
        method: "PATCH",
        headers: { Cookie: cookieHeader },
        body: formData,
    });

    return (await res.json()) as ApiResponse<IAuthUser>;
};
