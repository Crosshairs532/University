import { TAcademicSemester } from "../../AcademicSemester/semester.interface";
import { userModel } from "../user.model";

const findLastStudent = async () => {
  const lastStudent = await userModel
    .findOne({
      role: "student",
    })
    .sort({
      createdAt: -1,
    })
    .select({
      id: 1,
      _id: 0,
    })
    .lean();

  return lastStudent?.id ? lastStudent?.id : undefined;
};

export const generateStudentId = async (
  academicSemester: TAcademicSemester
) => {
  let currentId = (0).toString(); // 0000 by default

  const lastStudentId = await findLastStudent();

  // 2030 01 0001

  if (lastStudentId) {
    const lastStudentSemesterYear = lastStudentId.substring(0, 4);
    const lastStudentSemesterCode = lastStudentId.substring(4, 6);
    const currentSemesterCode = academicSemester.code;
    const currentYear = academicSemester.year;
    if (
      lastStudentSemesterCode == currentSemesterCode &&
      lastStudentSemesterYear == currentYear
    ) {
      currentId = lastStudentId.substring(6); // 0001
    }
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

  const newID = `${academicSemester.year}${academicSemester.code}${incrementId}`;
  return newID;
};
