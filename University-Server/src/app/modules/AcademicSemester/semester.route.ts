import { Router } from "express";
import { AcademicSemesterController } from "./semester.controller";
import schemaValidation from "../../middlewares/validateRequest";
import { AcademicSemesterValidationSchema } from "./semester.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/create-academic-semester",
  auth("super-admin", "admin"),
  schemaValidation(
    AcademicSemesterValidationSchema.CreateAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

router.get(
  "/all-academic-semester",
  auth("super-admin", "admin", "student", "faculty"),
  AcademicSemesterController.getAllAcademicSemester
);
router.get(
  "/:singleSemesterId",
  auth("super-admin", "admin", "student", "faculty"),
  AcademicSemesterController.getSingleAcademicSemester
);

router.patch(
  "/:singleSemesterId",
  auth("super-admin", "admin"),
  AcademicSemesterController.getSingleAcademicSemester
);

export const AcademicSemesterRouter = router;
