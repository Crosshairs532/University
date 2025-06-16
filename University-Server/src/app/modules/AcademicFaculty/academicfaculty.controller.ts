import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { academicFacultyService } from "./academicfaculty.service";

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await academicFacultyService.createAcademicFaculty(req.body);

    console.log(req.body);

    SendResponse(res, {
      success: true,
      data: result,
      message: "Academic Faculty Created Successfully",
    });
  }
);
const singleAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { facultyId } = req.params;
    const result = await academicFacultyService.singleAcademicFaculty(
      facultyId
    );
    SendResponse(res, {
      success: true,
      data: result,
      message: "Academic Faculty is retrieved Successfully",
    });
  }
);
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await academicFacultyService.getAllAcademicFaculty();
    SendResponse(res, {
      success: true,
      data: result,
      message: "All Academic Faculty is retrieved successfully",
    });
  }
);
const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { facultyId } = req.params;
    const result = await academicFacultyService.updateAcademicFaculty(
      facultyId,
      req.body
    );
    SendResponse(res, {
      success: true,
      data: result,
      message: "Academic Faculty updated successfully",
    });
  }
);

export const academicFacultyController = {
  createAcademicFaculty,
  singleAcademicFaculty,
  getAllAcademicFaculty,
  updateAcademicFaculty,
};
