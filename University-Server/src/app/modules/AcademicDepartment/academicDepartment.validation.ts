import { z } from "zod";

const updateAcademicDepartmentSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "name must be string",
        required_error: "name is required",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "academic faculty id must be string",
        required_error: "Faculty id is required",
      })
      .optional(),
  }),
});
const createAcademicDepartmentSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "name must be string",
      required_error: "name is required",
    }),
    academicFaculty: z.string({
      invalid_type_error: "academic faculty id must be string",
      required_error: "Faculty id is required",
    }),
  }),
});

export const academicDepartmentValidationSchema = {
  createAcademicDepartmentSchema,
  updateAcademicDepartmentSchema,
};
