import express from "express";
import studentRoutes from "../modules/student/student.route";
import userRoutes from "../modules/user/user.route";
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
];

for (const route of moduleRoutes) {
  router.use(route.path, route.route);
}

export default router;
