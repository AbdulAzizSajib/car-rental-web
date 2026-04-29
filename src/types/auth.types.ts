export type UserRole = "USER" | "ADMIN" | "DRIVER" | "HOST";

export type Visibility = "PUBLIC" | "PRIVATE" | "UNLISTED";

export interface IAuthUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    image?: string | null;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
    emailVerified: boolean;
}

export interface ILoginResponse {
    redirect?: boolean;
    token: string;
    accessToken: string;
    refreshToken: string;
    user: IAuthUser;
}

export interface IRegisterResponse {
    user: IAuthUser;
}

export interface IRefreshTokenResponse {
    token: string;
    accessToken: string;
    refreshToken: string;
}
