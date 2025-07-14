import express from "express";
import { studentController } from "./student.controller";
import auth from "../../middlewares/auth";

const studentRoutes = express.Router();

studentRoutes.get(
  "/",
  auth("super-admin", "admin"),
  studentController.getAllStudents
);
studentRoutes.get(
  "/:studentId",
  auth("super-admin", "admin"),
  studentController.getSingleStudent
);
studentRoutes.patch(
  "/:studentId",
  auth("super-admin", "admin"),
  studentController.updateStudent
);
studentRoutes.delete(
  "/:studentId",
  auth("super-admin", "admin"),
  studentController.deleteStudent
);

export default studentRoutes;
