import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { AdminValidations } from "../Admin/admin.validation";
import { authService } from "./auth.service";
import { authValidation } from "./auth.validation";

const login = catchAsync(async (req, res) => {
  const result = await authService.login(req.body);
  SendResponse(res, {
    success: true,
    message: "user logged in successfully",
    data: result,
  });
});
export const authController = {
  login,
};
