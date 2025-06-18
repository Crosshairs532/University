import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { academicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await academicDepartmentService.createAcademicDepartment(
      req.body
    );

    console.log(req.body);

    SendResponse(res, {
      success: true,
      data: result,
      message: "Academic Department Created Successfully",
    });
  }
);
const singleAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { departmentId } = req.params;
    const result = await academicDepartmentService.singleAcademicDepartment(
      departmentId
    );
    SendResponse(res, {
      success: true,
      data: result,
      message: "Academic Department is retrieved Successfully",
    });
  }
);
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await academicDepartmentService.getAllAcademicDepartment();
    SendResponse(res, {
      success: true,
      data: result,
      message: "All Academic Department is retrieved successfully",
    });
  }
);
const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { departmentId } = req.params;
    const result = await academicDepartmentService.updateAcademicDepartment(
      departmentId,
      req.body
    );
    SendResponse(res, {
      success: true,
      data: result,
      message: "Academic Department updated successfully",
    });
  }
);

export const academicDepartmentController = {
  createAcademicDepartment,
  singleAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
};
