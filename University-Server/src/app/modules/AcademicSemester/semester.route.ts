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
  AcademicSemesterController.getAllAcademicSemester
);
router.get(
  "/:singleSemesterId",
  AcademicSemesterController.getSingleAcademicSemester
);

export const AcademicSemesterRouter = router;
