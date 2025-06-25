import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { studentValidationSchemas } from "../student/student.validation";

import schemaValidation from "../../middlewares/validateRequest";
import { facultyValidations } from "../Faculty/faculty.validation";
const userRoutes = express.Router();

// validation schemas using zod
userRoutes.post(
  "/create-student",
  schemaValidation(studentValidationSchemas.createStudentValidationSchema),
  userController.createStudent
);

userRoutes.post(
  "/create-faculty",
  schemaValidation(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty
);

export default userRoutes;
