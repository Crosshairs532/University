import { z } from "zod";

const preRequisiteCourse = z.object({
  courseId: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidation = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(preRequisiteCourse).optional(),
  }),
});

export const courseValidationSchema = {
  createCourseValidation,
};
