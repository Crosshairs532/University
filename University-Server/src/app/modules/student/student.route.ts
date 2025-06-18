import express from "express";
import { studentController } from "./student.controller";

const studentRoutes = express.Router();

studentRoutes.get("/", studentController.getAllStudents);
studentRoutes.get("/:studentId", studentController.getSingleStudent);
studentRoutes.delete("/:studentId", studentController.deleteStudent);

export default studentRoutes;
