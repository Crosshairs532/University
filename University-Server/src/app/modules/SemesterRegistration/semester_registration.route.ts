import { Router } from "express";
import { semesterRegistrationController } from "./semester_registration.controller";
import { semesterRegistrationValidation } from "./semester_registration.validation";
import schemaValidation from "../../middlewares/validateRequest";

const semesterRegistrationRoutes = Router();

semesterRegistrationRoutes.post(
  "/create-semester-registration",
  schemaValidation(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema
  ),
  semesterRegistrationController.createSemesterRegistration
);

semesterRegistrationRoutes.get(
  "/registered-semesters",
  semesterRegistrationController.getALLRegisteredSemester
);
export default semesterRegistrationRoutes;
