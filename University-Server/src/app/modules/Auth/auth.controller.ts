import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";

import { authService } from "./auth.service";

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
  SendResponse(res, {
    success: true,
    message: "Password changed successfully",
    data: result,
  });
});
export const authController = {
  login,
  changePassword,
};
