import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be more than 3 characters" })
    .max(64, { message: "Name must be less than 64 characters" })
    .trim(),
  password: z
    .string()
    .min(6, { message: "Password must be more than 6 characters" })
    .max(32, { message: "Password must be less than 32 characters" })
    .trim(),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must be more than 6 characters" })
    .max(32, { message: "Password must be less than 32 characters" })
    .trim(),
});
