import { Router } from "express";
import schemaValidation from "../../middlewares/validateRequest";
import { academicDepartmentValidationSchema } from "./academicDepartment.validation";
import { academicDepartmentController } from "./academicDepartment.controller";
import auth from "../../middlewares/auth";

const AcademicDepartmentRoutes = Router();

AcademicDepartmentRoutes.post(
  "/create-academic-department",
  auth("super-admin", "admin"),
  schemaValidation(
    academicDepartmentValidationSchema.createAcademicDepartmentSchema
  ),
  academicDepartmentController.createAcademicDepartment
);
AcademicDepartmentRoutes.get(
  "/get-all-academic-department",
  academicDepartmentController.getAllAcademicDepartment
);
AcademicDepartmentRoutes.patch(
  "/:departmentId",
  schemaValidation(
    academicDepartmentValidationSchema.updateAcademicDepartmentSchema
  ),
  academicDepartmentController.updateAcademicDepartment
);
AcademicDepartmentRoutes.get(
  "/:departmentId",
  academicDepartmentController.singleAcademicDepartment
);

export default AcademicDepartmentRoutes;
