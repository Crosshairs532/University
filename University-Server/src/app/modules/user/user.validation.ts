import { z } from "zod";

const userValidation = z.object({
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .max(20, { message: "Password must be less than 20 characters" })
    .optional(),
});

export const userValidationSchema = { userValidation };
