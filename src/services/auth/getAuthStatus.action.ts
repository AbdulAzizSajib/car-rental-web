"use server";

import { TOKEN_KEYS } from "@/src/config/constants";
import { getCookie } from "@/src/lib/cookieUtils";

export const getAuthStatusAction = async (): Promise<boolean> => {
  const token = await getCookie(TOKEN_KEYS.ACCESS);
  return !!token;
};
