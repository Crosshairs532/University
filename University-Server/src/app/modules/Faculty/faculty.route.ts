import { Router } from "express";
import { facultyController } from "./faculty.controller";

const facultyRoutes = Router();

facultyRoutes.get("/all-faculty", facultyController.getAllFaculty);

export default facultyRoutes;
