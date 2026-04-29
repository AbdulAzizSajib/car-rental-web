export type UserRole = "USER" | "ADMIN" | "DRIVER" | "HOST";

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
};

export type RouteConfig = {
    exact: string[];
    pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/change-password"],
    pattern: [],
};

export const adminProtectedRoutes: RouteConfig = {
    pattern: [/^\/admin\/dashboard/],
    exact: [],
};

export const driverProtectedRoutes: RouteConfig = {
    pattern: [/^\/driver\/dashboard/],
    exact: [],
};

export const hostProtectedRoutes: RouteConfig = {
    pattern: [/^\/host\/dashboard/],
    exact: [],
};

export const userProtectedRoutes: RouteConfig = {
    pattern: [/^\/dashboard/],
    exact: ["/payment/success"],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "ADMIN";
    }
    if (isRouteMatches(pathname, driverProtectedRoutes)) {
        return "DRIVER";
    }
    if (isRouteMatches(pathname, hostProtectedRoutes)) {
        return "HOST";
    }
    if (isRouteMatches(pathname, userProtectedRoutes)) {
        return "USER";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "COMMON";
    }
    return null;
};

export const getDefaultDashboardRoute = (role: UserRole) => {
    if (role === "ADMIN") {
        return "/admin/dashboard";
    }
    if (role === "DRIVER") {
        return "/driver/dashboard";
    }
    if (role === "HOST") {
        return "/host/dashboard";
    }
    return "/dashboard";
};

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {
    const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;
    const routeOwner = getRouteOwner(sanitizedRedirectPath);

    if (routeOwner === null || routeOwner === "COMMON") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
};
