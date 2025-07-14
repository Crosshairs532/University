import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { facultyService } from "./faculty.service";

const getAllFaculty = catchAsync(async (req, res, next) => {
  const result = await facultyService.getAllFaculty(req.query);

  SendResponse(res, {
    success: true,
    message: "All faculty Data retrieved",
    data: result,
  });
});

const singleFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req?.query;
  const result = await facultyService.singleFaculty(facultyId as string);

  SendResponse(res, {
    success: true,
    message: "Single Faculty retrieved",
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req?.params;

  const result = await facultyService.updateFaculty(
    facultyId as string,
    req.body
  );

  SendResponse(res, {
    success: true,
    message: "Faculty updated successfully",
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res, next) => {
  const { facultyId } = req?.query;
  const result = await facultyService.deleteFaculty(facultyId as string);

  SendResponse(res, {
    success: true,
    message: "Faculty Deleted Successfully",
    data: result,
  });
});
export const facultyController = {
  getAllFaculty,
  singleFaculty,
  updateFaculty,
  deleteFaculty,
};
