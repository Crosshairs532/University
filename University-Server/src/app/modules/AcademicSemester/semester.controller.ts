import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { AcademicSemesterService } from "./semester.service";

const createAcademicSemester = catchAsync((req, res, next) => {
  const semester = AcademicSemesterService.createAcademicSemester(req.body);
  SendResponse(res, {
    success: true,
    message: "Academic Semester created successfully",
    data: semester,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
};
