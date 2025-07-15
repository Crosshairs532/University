import { Router } from "express";
import { courseController } from "./course.controller";
import schemaValidation from "../../middlewares/validateRequest";
import { courseValidationSchema } from "./course.validation";
import auth from "../../middlewares/auth";

const courseRoutes = Router();
courseRoutes.get(
  "/assigned-faculties",
  auth("admin", "super-admin", "faculty"),
  courseController.assingedFaculties
);
courseRoutes.get(
  "/get-all-course",
  auth("admin", "super-admin", "faculty", "student"),
  courseController.getAllCourse
);
courseRoutes.get(
  "/:courseId",
  auth("admin", "super-admin", "faculty", "student"),
  courseController.getSingleCourse
);
courseRoutes.post(
  "/create-course",
  auth("admin", "super-admin"),
  schemaValidation(courseValidationSchema.createCourseValidation),
  courseController.createCourse
);

courseRoutes.patch(
  "/:courseId",
  auth("admin", "super-admin"),
  courseController.updateCourse
);
courseRoutes.delete(
  "/:courseId",
  auth("admin", "super-admin"),
  courseController.deleteCourse
);

courseRoutes.put(
  "/:courseId/assign-faculty",
  auth("admin", "super-admin"),
  courseController.assignFaculty
);

courseRoutes.get(
  "/:courseId/get-faculties",
  courseController.getCourseFaculties
);
courseRoutes.delete(
  "/:courseId/remove-faculties",
  auth("admin", "super-admin"),
  courseController.removeFaculties
);

export default courseRoutes;
