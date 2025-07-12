import { Router } from "express";
import schemaValidation from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";

const authRouter = Router();

authRouter.post(
  "/login",
  schemaValidation(authValidation.loginValidationSchema),
  authController.login
);

authRouter.post(
  "/change-password",
  auth("admin", "student", "faculty"),
  schemaValidation(authValidation.changePasswordValidation),
  authController.changePassword
);

authRouter.post("/refreshToken", authController.refreshToken);

authRouter.post("/forget-password", authController.forgetPassword);
authRouter.post("/reset-password", authController.resetPassword);
export default authRouter;
