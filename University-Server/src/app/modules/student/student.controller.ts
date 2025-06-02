import { studentService } from "./student.service";
import { SendResponse } from "../../utils/SendResponse";
import catchAsync from "../../utils/catchAsynch";

const getAllStudents = catchAsync(async (req, res, next) => {
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
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const singleStudent = await studentService.getSingleStudent(studentId);

  SendResponse(res, {
    success: true,
    message: "Student fetched successfully",
    data: singleStudent,
  });
});
export const studentController = { getAllStudents, getSingleStudent };
