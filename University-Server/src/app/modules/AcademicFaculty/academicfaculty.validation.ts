import { z } from "zod";

const createAcademicFacultySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Academic Faculty name is require",
      invalid_type_error: "Academic Faculty name must be string",
    }),
  }),
});

const updateAcademicFacultySchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Academic Faculty name is require",
      invalid_type_error: "Academic Faculty name must be string",
    }),
  }),
});
export const academicFacultyValidation = {
  createAcademicFacultySchema,
  updateAcademicFacultySchema,
};
