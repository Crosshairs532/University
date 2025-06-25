import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { facultyService } from "./faculty.service";

const getAllFaculty = catchAsync(async (req, res, next) => {
  const result = await facultyService.getAllFaculty();

  SendResponse(res, {
    success: true,
    message: "All faculty Data retrieved",
    data: result,
  });
});

export const facultyController = { getAllFaculty };
