import { NextFunction, Request, Response } from "express";
import { studentService } from "./student.service";
import { SendResponse } from "../../utils/SendResponse";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allStudents = await studentService.getAllStudentsDB();

    SendResponse(res, {
      success: true,
      message: "Students fetched successfully",
      data: allStudents,
    });
  } catch (error) {
    next(error);
  }
};
export const studentController = { getAllStudents };
