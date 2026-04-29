import { z } from "zod";

export const loginZodSchema = z.object({
    email: z.email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long"),
});
export type ILoginPayload = z.infer<typeof loginZodSchema>;

export const registerZodSchema = z.object({
    name: z.string().min(1, "Name is required").max(120, "Name is too long"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    phone: z.string().max(11, "Phone number is too long"),
});
export type IRegisterPayload = z.infer<typeof registerZodSchema>;

export const verifyEmailZodSchema = z.object({
    email: z.email("Invalid email address"),
    otp: z.string().length(6, "OTP must be 6 digits"),
});
export type IVerifyEmailPayload = z.infer<typeof verifyEmailZodSchema>;

export const resendOtpZodSchema = z.object({
    email: z.email("Invalid email address"),
    type: z.enum(["email-verification", "forget-password"]),
});
export type IResendOtpPayload = z.infer<typeof resendOtpZodSchema>;

export const forgetPasswordZodSchema = z.object({
    email: z.email("Invalid email address"),
});
export type IForgetPasswordPayload = z.infer<typeof forgetPasswordZodSchema>;

export const resetPasswordZodSchema = z.object({
    email: z.email("Invalid email address"),
    otp: z.string().length(6, "OTP must be 6 digits"),
    newPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(20, "Password must be at most 20 characters"),
});
export type IResetPasswordPayload = z.infer<typeof resetPasswordZodSchema>;

export const changePasswordZodSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required"),
        newPassword: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(20, "Password must be at most 20 characters"),
    })
    .refine((d) => d.currentPassword !== d.newPassword, {
        message: "New password must differ from current password",
        path: ["newPassword"],
    });
export type IChangePasswordPayload = z.infer<typeof changePasswordZodSchema>;
