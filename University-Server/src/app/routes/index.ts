import express from "express";
import studentRoutes from "../modules/student/student.route";
import userRoutes from "../modules/user/user.route";
import { AcademicSemesterRouter } from "../modules/AcademicSemester/semester.route";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/student",
    route: studentRoutes,
  },
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/academic-semester",
    route: AcademicSemesterRouter,
  },
];

for (const route of moduleRoutes) {
  router.use(route.path, route.route);
}

export default router;
