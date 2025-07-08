import { Router } from "express";
import schemaValidation from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/login",
  schemaValidation(authValidation.loginValidationSchema),
  authController.login
);
