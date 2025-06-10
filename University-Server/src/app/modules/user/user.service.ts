import { AcademicSemester } from "./../AcademicSemester/semester.model";
import { configFiles } from "../../config";
import { studentModel } from "../student/student.model";
import { TUser } from "./user.interface";

import { userModel } from "./user.model";
import { TAcademicSemester } from "../AcademicSemester/semester.interface";

const createStudentDB = async (password: string, studentData: any) => {
  const user: Partial<TUser> = {};
  // create user
  user.password = password || (configFiles.default_password as string);
  user.role = "student";

  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  const findLastStudent = async () => {
    const lastStudent = await userModel
      .findOne({
        role: "student",
      })
      .select({
        id: 1,
        _id: 0,
      })
      .sort({
        createdAt: -1,
      }).lean;

    return lastStudent?.id ? lastStudent.bind.substring(6) : undefined;
  };
  const generateStudentId = async (academicSemester: TAcademicSemester) => {
    const currentId = (await findLastStudent()) || (0).toString();
    const incrementId = (Number(currentId) + 1).toString().padStart(4, "0");

    const newID = `${academicSemester.year}${academicSemester.code}${incrementId}`;
    return newID;
  };
  user.id = (await generateStudentId(academicSemester!)) as string;
  try {
    const result = await userModel.create(user);
    // create student
    if (result) {
      studentData.userId = result._id;
      studentData.id = result.id;
      const student = await studentModel.create(studentData);
      return student;
    }
  } catch (error) {
    console.error("Error creating student:", error);
    throw new Error("Failed to create student");
  }
};

export const userService = {
  createStudentDB,
};
