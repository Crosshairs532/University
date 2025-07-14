import { userService } from "./user.service";
import { SendResponse } from "../../utils/SendResponse";
import catchAsync from "../../utils/catchAsynch";
import AppError from "../../utils/AppError";
import status from "http-status";

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student } = req?.body;

  const user = await userService.createStudentDB(req?.file, password, student);

  SendResponse(res, {
    success: true,
    data: user,
    message: "Student created successfully",
  });
});

const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty } = req?.body;

  const user = await userService.createFaculty(req?.file, password, faculty);

  SendResponse(res, {
    success: true,
    data: user,
    message: "Faculty created successfully",
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userService.createAdmin(req?.file, password, adminData);

  SendResponse(res, {
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError(status.NOT_FOUND, "Token not found");
  }
  const result = await userService.getMe(token);
  SendResponse(res, {
    success: true,
    message: "user is retrieved successfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const data = req.body;

  const result = await userService.changeStatus(id, data);
});
export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
