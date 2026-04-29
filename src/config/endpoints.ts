export const endpoints = {
    auth: {
        register: "/auth/register",
        verifyEmail: "/auth/verify-email",
        resendOtp: "/auth/resend-otp",
        login: "/auth/login",
        me: "/auth/me",
        refreshToken: "/auth/refresh-token",
        changePassword: "/auth/change-password",
        forgetPassword: "/auth/forget-password",
        resetPassword: "/auth/reset-password",
        googleLogin: "/auth/login/google",
        googleSuccess: "/auth/google/success",
        logout: "/auth/logout",
    },
    users: {
        createAdmin: "/users/create-admin",
        me: "/users/me",
    },
   

} as const;
