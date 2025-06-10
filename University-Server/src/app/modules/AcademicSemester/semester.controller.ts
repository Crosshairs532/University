import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { AcademicSemesterService } from "./semester.service";

const createAcademicSemester = catchAsync((req, res, next) => {
  console.log(req.body);
  // const semester = AcademicSemesterService.createAcademicSemester(req.body);
  // SendResponse(res, {
  //   success: true,
  //   message: "Academic Semester created successfully",
  //   data: semester,
  // });
});

const getAllAcademicSemester = catchAsync((req, res, next) => {
  const allSemester = AcademicSemesterService.getAllAcademicSemester();

  SendResponse(res, {
    success: true,
    message: "All Academic Semester is fetched",
    data: allSemester,
  });
});
const getSingleAcademicSemester = catchAsync((req, res, next) => {
  const { singleSemesterId } = req.params;
  const singleSemester =
    AcademicSemesterService.getSingleAcademicSemester(singleSemesterId);
  SendResponse(res, {
    success: true,
    message: "Singe Academic Semester fetched!",
    data: singleSemester,
  });
});

const updateSingleAcademicSemester = catchAsync((req, res, next) => {
  const { singleSemesterId } = req.params;

  const updatedSemester = AcademicSemesterService.updateSingleAcademicSemester(
    singleSemesterId,
    req.body
  );
  SendResponse(res, {
    success: true,
    message: "Academic Semester updated!",
    data: updatedSemester,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
