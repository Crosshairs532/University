import { userService } from "./user.service";
import { SendResponse } from "../../utils/SendResponse";
import catchAsync from "../../utils/catchAsynch";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req?.body;

  console.log(password, student);

  try {
    const user = await userService.createStudentDB(password, student);

    SendResponse(res, {
      success: true,
      data: user,
      message: "Student created successfully",
    });
  } catch (error) {
    next(error);
  }
});
export const userController = { createStudent };
