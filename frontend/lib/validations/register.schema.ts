import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters"),

    registrationNumber: z
      .string()
      .min(5, "Registration number is required"),

    email: z
      .email("Please enter a valid email address"),

    mobile: z
      .string()
      .min(10, "Enter a valid mobile number"),

    department: z
      .string()
      .min(2, "Department is required"),

    batchYear: z
      .string()
      .min(4, "Batch year is required"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z
      .string(),

    role: z.enum(["Student", "Alumni"]),

    acceptTerms: z
      .boolean()
      .refine((value) => value === true, {
        message: "You must accept the Terms & Conditions",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;