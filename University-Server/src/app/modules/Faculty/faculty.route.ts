import { Router } from "express";
import { facultyController } from "./faculty.controller";
import auth from "../../middlewares/auth";

const facultyRoutes = Router();

facultyRoutes.get(
  "/all-faculty",
  auth("super-admin", "admin", "faculty"),
  facultyController.getAllFaculty
);
facultyRoutes.get(
  "/:facultyId",
  auth("super-admin", "admin", "faculty"),
  facultyController.singleFaculty
);
facultyRoutes.patch(
  "/:facultyId",
  auth("super-admin", "admin"),
  facultyController.updateFaculty
);
facultyRoutes.delete(
  "/:facultyId",
  auth("super-admin", "admin"),
  facultyController.deleteFaculty
);

export default facultyRoutes;
