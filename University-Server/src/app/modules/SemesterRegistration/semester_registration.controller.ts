import catchAsync from "../../utils/catchAsynch";
import { SendResponse } from "../../utils/SendResponse";
import { semesterRegistrationService } from "./semester_registration.service";

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationService.createSemesterRegistration(
    req.body
  );

  SendResponse(res, {
    success: true,
    message: "Academic Semester created successfully",
    data: result,
  });
});

const getALLRegisteredSemester = catchAsync(async (req, res) => {
  const result = await semesterRegistrationService.getAllRegisteredSemester(
    req.query
  );

  SendResponse(res, {
    success: true,
    message: "All Register Semester retrieved!",
    data: result,
  });
});
const singleRegisteredSemester = catchAsync(async (req, res) => {
  const { registeredSemesterId } = req.params;
  const result = await semesterRegistrationService.singleRegisteredSemester(
    registeredSemesterId
  );

  SendResponse(res, {
    success: true,
    message: "Single Register Semester retrieved!",
    data: result,
  });
});

const updateRegisteredSemester = catchAsync(async (req, res) => {
  const { registeredSemesterId } = req.params;
  const result = await semesterRegistrationService.updateSemesterRegistration(
    registeredSemesterId,
    req.body
  );
  SendResponse(res, {
    success: true,
    message: `${result?.status} updated successfully`,
    data: result,
  });
});
export const semesterRegistrationController = {
  createSemesterRegistration,
  getALLRegisteredSemester,
  singleRegisteredSemester,
  updateRegisteredSemester,
};
