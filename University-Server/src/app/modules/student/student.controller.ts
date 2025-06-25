import { studentService } from "./student.service";
import { SendResponse } from "../../utils/SendResponse";
import catchAsync from "../../utils/catchAsynch";

const getAllStudents = catchAsync(async (req, res, next) => {
  const allStudents = await studentService.getAllStudentsDB(req.query);

  SendResponse(res, {
    success: true,
    message: "Students fetched successfully",
    data: allStudents,
  });
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

const updateStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const singleStudent = await studentService.updateStudent(studentId, req.body);

  SendResponse(res, {
    success: true,
    message: "Student updated successfully",
    data: singleStudent,
  });
});

const deleteStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const singleStudent = await studentService.deleteStudent(studentId);

  SendResponse(res, {
    success: true,
    message: "Student deleted successfully",
    data: singleStudent,
  });
});
export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
