import express from "express";
import { userController } from "./user.controller";
const userRoutes = express.Router();

userRoutes.post("/create-student", userController.createStudent);

export default userRoutes;
