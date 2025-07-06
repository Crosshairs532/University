import status from "http-status";
import AppError from "../../utils/AppError";
import { AcademicSemester } from "../AcademicSemester/semester.model";
import { TSemesterRegistration } from "./semester_registration.interface";
import { semesterRegistrationModel } from "./semester_registration.model";
import QueryBuilder from "../../builder/QueryBuilder";

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

const getAllRegisteredSemester = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(
    semesterRegistrationModel.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .fields()
    .paginate();
  return result.modelQuery;
};
const singleRegisteredSemester = async (id: string) => {
  const result = await semesterRegistrationModel.findById(id);
  if (!result) {
    throw new AppError(status.BAD_REQUEST, "No semester found!");
  }

  return result;
};
const updateSemesterRegistration = async () => {};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllRegisteredSemester,
  updateSemesterRegistration,
  singleRegisteredSemester,
};
