import { z } from "zod";

export const createAdminZodSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.enum(["ADMIN", "USER"]),
    admin: z.object({
        name: z.string().min(1, "Name is required"),
        email: z.email("Invalid email address"),
        contactNumber: z.string().min(7, "Contact number is required"),
        profilePhoto: z.string().optional(),
    }),
});
export type ICreateAdminPayload = z.infer<typeof createAdminZodSchema>;

export const updateProfileZodSchema = z.object({
    name: z.string().min(1).optional(),
    phone: z.string().min(7).optional(),
});
export type IUpdateProfilePayload = z.infer<typeof updateProfileZodSchema>;
