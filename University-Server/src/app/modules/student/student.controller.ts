import { NextFunction, Request, RequestHandler, Response } from "express";
import { studentService } from "./student.service";
import { SendResponse } from "../../utils/SendResponse";

const catchAsync = (fn: RequestHandler) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getAllStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

const getSingleStudent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { studentId } = req.params;
    const singleStudent = await studentService.getSingleStudent(studentId);

    SendResponse(res, {
      success: true,
      message: "Student fetched successfully",
      data: singleStudent,
    });
  }
);
export const studentController = { getAllStudents, getSingleStudent };
