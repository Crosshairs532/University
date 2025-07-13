import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { EnrolledCourseServices } from "./enroll.service";

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body
  );

  SendResponse(res, {
    success: true,
    message: "Student is enrolled successfully",
    data: result,
  });
});

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId;
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body
  );

  SendResponse(res, {
    success: true,
    message: "Marks is updated successfully",
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
