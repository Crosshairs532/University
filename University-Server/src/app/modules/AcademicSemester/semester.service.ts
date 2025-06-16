import { TAcademicSemester } from "./semester.interface";
import { AcademicSemester } from "./semester.model";

const createAcademicSemester = async (payload: any) => {
  const AcademicSemesterCode: { [key: string]: string } = {
    Spring: "01",
    Summer: "02",
    Fall: "03",
  };

  if (AcademicSemesterCode[payload.name] !== payload.code) {
    throw new Error("Semester Code invalid!");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemester = async () => {
  const allSemester = await AcademicSemester.find({});
  return allSemester;
};

const getSingleAcademicSemester = async (semesterId: string) => {
  const singleSemester = await AcademicSemester.findById(semesterId);
  if (!singleSemester) {
    throw new Error("Semester Does not Exist!");
  }
  return singleSemester;
};

const updateSingleAcademicSemester = async (
  semesterId: string,
  payload: TAcademicSemester
) => {
  const isSemesterExist = await AcademicSemester.findById(semesterId);

  if (!isSemesterExist) {
    throw new Error("Semester Does not Exist!");
  }
  const singleSemester = await AcademicSemester.findByIdAndUpdate(
    semesterId,
    payload,
    {
      new: true,
    }
  );
  return singleSemester;
};
export const AcademicSemesterService = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
