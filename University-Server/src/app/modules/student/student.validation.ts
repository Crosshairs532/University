import { z } from "zod";

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string().optional(),
  lastName: z.string(),
});
const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    student: z.object({
      name: z.string(),
      gender: z.enum(["MALE", "FEMALE"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      emergencyContactNo: z.string(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});
export const studentValidationSchemas = {
  createStudentValidationSchema,
};
