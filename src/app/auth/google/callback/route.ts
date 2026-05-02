import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "../../../../lib/authUtils";
import type { UserRole } from "../../../../lib/authUtils";

function getTokenMaxAge(token: string, fallback: number): number {
  try {
    const payload = jwt.decode(token) as JwtPayload;
    if (!payload?.exp) return fallback;
    const remaining = payload.exp - Math.floor(Date.now() / 1000);
    return remaining > 0 ? remaining : fallback;
  } catch {
    return fallback;
  }
}

function addTokenCookie(
  response: NextResponse,
  name: string,
  value: string,
  maxAge: number
) {
  response.cookies.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge,
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const accessToken  = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const sessionToken = searchParams.get("sessionToken");
  const role         = (searchParams.get("role") ?? "USER") as UserRole;
  const redirect     = searchParams.get("redirect") ?? "";
  const error        = searchParams.get("error");

  if (error || !accessToken || !refreshToken) {
    const reason = error ?? "oauth_failed";
    return NextResponse.redirect(new URL(`/login?error=${reason}`, request.url));
  }

  const targetPath =
    redirect && isValidRedirectForRole(redirect, role)
      ? redirect
      : getDefaultDashboardRoute(role);

  const response = NextResponse.redirect(new URL(targetPath, request.url));

  addTokenCookie(response, "accessToken",  accessToken,  getTokenMaxAge(accessToken, 86400));
  addTokenCookie(response, "refreshToken", refreshToken, getTokenMaxAge(refreshToken, 604800));
  if (sessionToken) {
    addTokenCookie(response, "better-auth.session_token", sessionToken, 86400);
  }

  return response;
}
