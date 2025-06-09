import { z } from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./semester.constant";

const CreateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
      required_error: "Semester name is required",
      invalid_type_error: "Semester name is invalid",
    }),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
      required_error: "Semester Code is required",
      invalid_type_error: "Semester Code is invalid",
    }),
    year: z.string().date(),
    startMonth: z.enum(Months as [string, ...string[]]),
    endMonth: z.enum(Months as [string, ...string[]]),
  }),
});
export const AcademicSemesterValidationSchema = {
  CreateAcademicSemesterValidationSchema,
};
