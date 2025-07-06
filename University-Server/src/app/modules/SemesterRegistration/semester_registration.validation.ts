import { z } from "zod";

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    status: z.enum(["UPCOMING", "ENDED", "ONGOING"]),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

export const semesterRegistrationValidation = {
  createSemesterRegistrationValidationSchema,
};
