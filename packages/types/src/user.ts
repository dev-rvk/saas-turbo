import { z } from "zod";

export const userSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(2).max(50),
    emailVerified: z.boolean(),
    email: z.string().email().max(255),
    createdAt: z.date(),
    updatedAt: z.date(),
    image: z.string().url().nullable().optional(),
});

export type UserType = z.infer<typeof userSchema>;