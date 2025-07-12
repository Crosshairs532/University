import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";

import { authService } from "./auth.service";
import { configFiles } from "../../config";

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  SendResponse(res, {
    success: true,
    message: "user logged in successfully",
    data: result,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req.user, req.body);
  const { accessToken, refreshToken, needPasswordChange } =
    result as JwtPayload;

  res.cookie("refreshToken", refreshToken, {
    secure: configFiles.node_env == "production",
    httpOnly: true,
  });

  SendResponse(res, {
    success: true,
    message: "Password changed successfully",
    data: {
      accessToken,
      needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const result = await authService.refreshToken(req.cookies);
  SendResponse(res, {
    success: true,
    message: "RefreshToken retrieved successfully",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const id = req.body.id;
  const result = authService.forgetPassword(id);
  SendResponse(res, {
    success: true,
    message: "Check you email for reset link!",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const result = authService.resetPassword(
    req.headers.authorization as string,
    req.body
  );
  SendResponse(res, {
    success: true,
    message: "Check you email for reset link!",
    data: result,
  });
});
export const authController = {
  login,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
