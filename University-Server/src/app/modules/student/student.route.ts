import express from "express";
import { studentController } from "./student.controller";

const studentRoutes = express.Router();

studentRoutes.get("/", studentController.getAllStudents);
export default studentRoutes;
