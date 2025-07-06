import { Router } from "express";
import { courseController } from "./course.controller";
import schemaValidation from "../../middlewares/validateRequest";
import { courseValidationSchema } from "./course.validation";

const courseRoutes = Router();
courseRoutes.get("/assigned-faculties", courseController.assingedFaculties);
courseRoutes.get("/get-all-course", courseController.getAllCourse);
courseRoutes.get("/:courseId", courseController.getSingleCourse);
courseRoutes.post(
  "/create-course",
  schemaValidation(courseValidationSchema.createCourseValidation),
  courseController.createCourse
);

courseRoutes.patch("/:courseId", courseController.updateCourse);
courseRoutes.delete("/:courseId", courseController.deleteCourse);

courseRoutes.put("/:courseId/assign-faculty", courseController.assignFaculty);

export default courseRoutes;
