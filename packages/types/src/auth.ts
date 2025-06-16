import { z } from "zod";

export const signUpSchema = z.object({
  firstname: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "First name can only contain letters and spaces"),
  lastname: z
    .string()
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Last name can only contain letters and spaces")
    .optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  pwd: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(
      /^(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter"
    ),
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  pwd: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters"),
});

export const ResetPasswordEmailSchema = z.object({
  toEmail: z.string().email("Invalid email address"),
  userFirstname: z.string().min(2, "User first name is required"),
  resetPasswordLink: z.string().min(2, "Reset password link is required").url("Reset password link must be a valid URL"),
});

export const VerificationEmailSchema = z.object({
  toEmail: z.string().email("Invalid email address"),
  userFirstname: z.string().min(2, "First name is required"),
  code: z.string().min(6, "Verification code must be 6 characters"),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type ResetPasswordEmailData = z.infer<typeof ResetPasswordEmailSchema>;
export type VerificationEmailData = z.infer<typeof VerificationEmailSchema>;