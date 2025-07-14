import { z } from "zod";

const nameValidation = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .max(20, { message: "Name Must be less than 20" }),
  middleName: z.string().optional(),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .max(20, { message: "Name Must be less than 20" }),
});
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    faculty: z.object({
      id: z.string({ required_error: "Faculty Id is required" }).optional(),
      userId: z
        .string({ required_error: "Faculty user Id is required" })
        .optional(),
      designation: z.string(),
      name: nameValidation,
      gender: z.enum(["MALE", "FEMALE"]),

      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profileImage: z.string().optional(),
      academicDepartment: z.string({
        required_error: "Academic Department Id is required",
      }),
      academicFaculty: z.string({
        required_error: "Academic Faculty Id is required",
      }),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
};
