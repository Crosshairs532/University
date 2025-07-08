import { z } from "zod";

const loginValidationSchema = z.object({
  id: z.string({
    required_error: "Id is required",
    invalid_type_error: "Id is valid",
  }),
  password: z.string({
    required_error: "password is required",
  }),
});

export const authValidation = {
  loginValidationSchema,
};
