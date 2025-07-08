import { z } from "zod";

const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: "Id is required",
      invalid_type_error: "Id is valid",
    }),
    password: z.string({
      required_error: "password is required",
    }),
  }),
});

const changePasswordValidation = z.object({
  oldPassword: z.string({
    required_error: "Old password is required",
  }),
  newPassword: z.string({
    required_error: "New password is required",
  }),
});
export const authValidation = {
  loginValidationSchema,
  changePasswordValidation,
};
