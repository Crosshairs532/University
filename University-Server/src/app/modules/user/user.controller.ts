import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { SendResponse } from "../../utils/SendResponse";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const userController = { createStudent };
