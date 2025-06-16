import { Router } from "express";
import { academicFacultyController } from "./academicfaculty.controller";
import schemaValidation from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicfaculty.validation";

const AcademicFacultyRoutes = Router();

AcademicFacultyRoutes.post(
  "/create-academic-faculty",
  schemaValidation(academicFacultyValidation.createAcademicFacultySchema),
  academicFacultyController.createAcademicFaculty
);
AcademicFacultyRoutes.get(
  "/get-all-academic-faculty",
  academicFacultyController.getAllAcademicFaculty
);
AcademicFacultyRoutes.patch(
  "/:facultyId",
  schemaValidation(academicFacultyValidation.updateAcademicFacultySchema),
  academicFacultyController.updateAcademicFaculty
);
AcademicFacultyRoutes.get(
  "/:facultyId",
  academicFacultyController.singleAcademicFaculty
);

export default AcademicFacultyRoutes;
