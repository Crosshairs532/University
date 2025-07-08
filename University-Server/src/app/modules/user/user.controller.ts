import { userService } from "./user.service";
import { SendResponse } from "../../utils/SendResponse";
import catchAsync from "../../utils/catchAsynch";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req?.body;

  console.log(password, student);

  const user = await userService.createStudentDB(password, student);

  SendResponse(res, {
    success: true,
    data: user,
    message: "Student created successfully",
  });
});

const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty } = req?.body;

  const user = await userService.createFaculty(password, faculty);

  SendResponse(res, {
    success: true,
    data: user,
    message: "Faculty created successfully",
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdmin(password, adminData);

  SendResponse(res, {
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});
export const userController = { createStudent, createFaculty };
