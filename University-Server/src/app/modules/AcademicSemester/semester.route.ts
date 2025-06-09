import { Router } from "express";
import { AcademicSemesterController } from "./semester.controller";
import schemaValidation from "../../middlewares/validateRequest";
import { AcademicSemesterValidationSchema } from "./semester.validation";

const router = Router();

router.post(
  "/create-academic-semester",
  schemaValidation(
    AcademicSemesterValidationSchema.CreateAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRouter = router;
