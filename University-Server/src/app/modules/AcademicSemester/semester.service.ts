import { AcademicSemester } from "./semester.model";

const createAcademicSemester = (payload: any) => {
  const result = AcademicSemester.create(payload);
  return result;
};
export const AcademicSemesterService = { createAcademicSemester };
