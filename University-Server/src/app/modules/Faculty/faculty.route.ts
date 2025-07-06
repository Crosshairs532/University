import { Router } from "express";
import { facultyController } from "./faculty.controller";

const facultyRoutes = Router();

facultyRoutes.get("/all-faculty", facultyController.getAllFaculty);

facultyRoutes.get("/:facultyId", facultyController.singleFaculty);
facultyRoutes.patch("/:facultyId", facultyController.updateFaculty);
facultyRoutes.delete("/:facultyId", facultyController.deleteFaculty);

export default facultyRoutes;
