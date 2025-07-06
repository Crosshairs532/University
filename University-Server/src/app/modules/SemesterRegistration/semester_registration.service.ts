import status from "http-status";
import AppError from "../../utils/AppError";
import { AcademicSemester } from "../AcademicSemester/semester.model";
import { TSemesterRegistration } from "./semester_registration.interface";
import { semesterRegistrationModel } from "./semester_registration.model";

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  const academicSemester = payload?.academicSemester;
  const isSemesterExist = await AcademicSemester.findById(academicSemester);

  if (!isSemesterExist) {
    throw new AppError(status.BAD_REQUEST, "Academic Semester do not exist");
  }
  const isSemesterRegistered = await semesterRegistrationModel.findById(
    academicSemester
  );
  if (isSemesterRegistered) {
    throw new AppError(status.CONFLICT, "This Semester already exists");
  }

  const result = await semesterRegistrationModel.create(payload);

  return result;
};

const getAllRegisteredSemester = async () => {
  const result = await semesterRegistrationModel.find();
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllRegisteredSemester,
};
