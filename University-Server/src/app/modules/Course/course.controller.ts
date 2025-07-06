import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { courseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseService.createCourse(req.body);
  SendResponse(res, {
    data: result,
    success: true,
    message: "Course created successfully",
  });
});
const getAllCourse = catchAsync(async (req, res) => {
  const result = await courseService.getAllCourse(req.query);
  SendResponse(res, {
    data: result,
    success: true,
    message: "All Course retrieved",
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseService.getSingleCourse(courseId as string);
  SendResponse(res, {
    data: result,
    success: true,
    message: "Single Course Retrieved",
  });
});
const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req?.params;
  const result = await courseService.updateCourse(courseId as string, req.body);
  SendResponse(res, {
    data: result,
    success: true,
    message: "Course updated Successfully",
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { courseId } = req?.query;
  const result = await courseService.updateCourse(courseId as string, req.body);
  SendResponse(res, {
    data: result,
    success: true,
    message: "Course deleted Successfully",
  });
});

const assignFaculty = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseService.assignFaculty(courseId, faculties);
  SendResponse(res, {
    data: result,
    success: true,
    message: "Faculty assigned Successfully",
  });
});

const assingedFaculties = catchAsync(async (req, res) => {
  console.log("controller");
  const result = await courseService.assingedFaculties(req?.query);
  SendResponse(res, {
    data: result,
    success: true,
    message: "All Faculty assigned Successfully",
  });
});

export const courseController = {
  createCourse,
  deleteCourse,
  updateCourse,
  getAllCourse,
  getSingleCourse,
  assignFaculty,
  assingedFaculties,
};
