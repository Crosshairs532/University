import express from "express";
import studentRoutes from "../modules/student/student.route";
import userRoutes from "../modules/user/user.route";
import { AcademicSemesterRouter } from "../modules/AcademicSemester/semester.route";
import AcademicFacultyRoutes from "../modules/AcademicFaculty/academicfaculty.routes";
import AcademicDepartmentRoutes from "../modules/AcademicDepartment/academicDepartment.route";
import facultyRoutes from "../modules/Faculty/faculty.route";
import courseRoutes from "../modules/Course/course.route";

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
  {
    path: "/academic-faculty",
    route: AcademicFacultyRoutes,
  },
  {
    path: "/academic-department",
    route: AcademicDepartmentRoutes,
  },
  {
    path: "/faculty",
    route: facultyRoutes,
  },
  {
    path: "/course",
    route: courseRoutes,
  },
];

for (const route of moduleRoutes) {
  router.use(route.path, route.route);
}

export default router;
