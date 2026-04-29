export const USER_ROLES = {
    ADMIN: "ADMIN",
    USER: "USER",
    Driver: "DRIVER",
    Host: "HOST"
} as const;


export const TOKEN_KEYS = {
    ACCESS: "accessToken",
    REFRESH: "refreshToken",
    SESSION: "better-auth.session_token",
} as const;
