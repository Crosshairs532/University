import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { EnrolledCourseControllers } from "./enroll.controller";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth("student"),

  EnrolledCourseControllers.createEnrolledCourse
);

router.patch(
  "/update-enrolled-course-marks",
  auth("faculty"),

  EnrolledCourseControllers.updateEnrolledCourseMarks
);

export const EnrolledCourseRoutes = router;
