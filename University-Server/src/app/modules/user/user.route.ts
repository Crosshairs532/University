import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { studentValidationSchemas } from "../student/student.validation";

import schemaValidation from "../../middlewares/validateRequest";
const userRoutes = express.Router();

// validation schemas using zod
userRoutes.post(
  "/create-student",
  schemaValidation(studentValidationSchemas.createStudentValidationSchema),
  userController.createStudent
);

export default userRoutes;
