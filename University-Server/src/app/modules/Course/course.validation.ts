import { z } from "zod";

const preRequisiteCourse = z.object({
  courseId: z.string(),
  isDeleted: z.boolean().optional(),
});

const updatePreRequisiteCourse = z.object({
  courseId: z.string().optional(),
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

const updateCourseValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number().optional(),
    isDeleted: z.boolean().optional(),
    preRequisiteCourses: z.array(updatePreRequisiteCourse).optional(),
  }),
});

export const courseValidationSchema = {
  createCourseValidation,
  updateCourseValidation,
};
