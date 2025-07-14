import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import { studentValidationSchemas } from "../student/student.validation";

import schemaValidation from "../../middlewares/validateRequest";
import { facultyValidations } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/Cloudinary";

const userRoutes = express.Router();

// validation schemas using zod
userRoutes.post(
  "/create-student",
  auth("super-admin", "admin"),
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },

  schemaValidation(studentValidationSchemas.createStudentValidationSchema),
  userController.createStudent
);

userRoutes.post(
  "/create-faculty",
  auth("super-admin", "admin"),
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  schemaValidation(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty
);
userRoutes.post(
  "/create-admin",
  auth("super-admin", "admin"),
  upload.single("file"),
  (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  schemaValidation(createAdminValidationSchema),
  userController.createAdmin
);

userRoutes.get(
  "/me",
  auth("student", "faculty", "admin"),
  userController.getMe
);

userRoutes.post(
  "/change-status/:id",
  auth("super-admin", "admin"),
  userController.changeStatus
);

export default userRoutes;
