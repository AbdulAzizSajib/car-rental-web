import { NextRequest, NextResponse } from 'next/server';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute } from './lib/authUtils';
import { jwtUtils } from './lib/jwtUtils';
import { isTokenExpiringSoon } from './lib/tokenUtils';
import { getNewTokensWithRefreshToken } from './services/auth/refresh-token.action';
import { getUserInfo } from './services/users/me.action';
import type { UserRole } from './types/auth.types';

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    return await getNewTokensWithRefreshToken(refreshToken);
  } catch (error) {
    console.error('Error refreshing token in proxy:', error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    const pathWithQuery = `${pathname}${request.nextUrl.search}`;
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    const accessSecret = process.env.JWT_ACCESS_SECRET as string;

    const decodedAccessToken = accessToken && jwtUtils.verifyToken(accessToken, accessSecret).data;
    const isValidAccessToken = !!(
      accessToken && jwtUtils.verifyToken(accessToken, accessSecret).success
    );

    let userRole: UserRole | null = null;

    if (decodedAccessToken && typeof decodedAccessToken === 'object') {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routeOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    // Proactively refresh access token if it is about to expire
    if (isValidAccessToken && refreshToken && (await isTokenExpiringSoon(accessToken))) {
      const requestHeaders = new Headers(request.headers);

      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);
        if (refreshed) {
          requestHeaders.set('x-token-refreshed', '1');
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
      }

      return NextResponse.next({ request: { headers: requestHeaders } });
    }

    // Rule 1: Logged-in users should not access auth pages,
    // except verify-email and reset-password (account-state mandated)
    if (
      isAuth &&
      isValidAccessToken &&
      pathname !== '/verify-email' &&
      pathname !== '/reset-password'
    ) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }

    // Rule 2: Reset password page rules
    if (pathname === '/reset-password') {
      const email = request.nextUrl.searchParams.get('email');

      if (accessToken && email) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
        );
      }

      // From forgot-password flow
      if (email) {
        return NextResponse.next();
      }

      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    // Rule 3: Public route -> allow
    if (routeOwner === null) {
      return NextResponse.next();
    }

    // Rule 4: Not logged in trying to hit protected route -> redirect to login
    if (!accessToken || !isValidAccessToken) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathWithQuery);
      return NextResponse.redirect(loginUrl);
    }

    // Rule 5: Enforce verify-email / reset-password if account state requires it
    if (accessToken) {
      const userInfo = await getUserInfo();

      if (userInfo) {
        if (userInfo.emailVerified === false) {
          if (pathname !== '/verify-email') {
            const verifyEmailUrl = new URL('/verify-email', request.url);
            verifyEmailUrl.searchParams.set('email', userInfo.email);
            return NextResponse.redirect(verifyEmailUrl);
          }
          return NextResponse.next();
        }

        if (userInfo.emailVerified && pathname === '/verify-email') {
          return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
          );
        }

}
    }

    // Rule 6: Common protected route -> allow
    if (routeOwner === 'COMMON') {
      return NextResponse.next();
    }

    // Rule 7: Role-gated route, user lacks required role -> default dashboard
    if (routeOwner === 'ADMIN' && routeOwner !== userRole) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error in proxy:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - .well-known
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
  ],
};
