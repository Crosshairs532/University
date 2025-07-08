import express from "express";
import studentRoutes from "../modules/student/student.route";
import userRoutes from "../modules/user/user.route";
import { AcademicSemesterRouter } from "../modules/AcademicSemester/semester.route";
import AcademicFacultyRoutes from "../modules/AcademicFaculty/academicfaculty.routes";
import AcademicDepartmentRoutes from "../modules/AcademicDepartment/academicDepartment.route";
import facultyRoutes from "../modules/Faculty/faculty.route";
import courseRoutes from "../modules/Course/course.route";
import semesterRegistrationRoutes from "../modules/SemesterRegistration/semester_registration.route";
import { AdminRoutes } from "../modules/Admin/admin.routes";
import authRouter from "../modules/Auth/auth.route";

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
  {
    path: "/semester",
    route: semesterRegistrationRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/auth",
    route: authRouter,
  },
];

for (const route of moduleRoutes) {
  router.use(route.path, route.route);
}

export default router;
