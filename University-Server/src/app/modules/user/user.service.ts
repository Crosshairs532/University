import { AcademicSemester } from "./../AcademicSemester/semester.model";
import { configFiles } from "../../config";
import { studentModel } from "../student/student.model";
import { TUser } from "./user.interface";

import { userModel } from "./user.model";
import { TAcademicSemester } from "../AcademicSemester/semester.interface";
import { generateStudentId } from "../../utils/generateStudentId";
import mongoose from "mongoose";
import AppError from "../../utils/AppError";

const createStudentDB = async (password: string, studentData: any) => {
  const user: Partial<TUser> = {};
  // create user
  user.password = password || (configFiles.default_password as string);
  user.role = "student";

  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    user.id = (await generateStudentId(academicSemester!)) as string;
    const result = await userModel.create([user], { session });
    // create student
    if (!result.length) {
      throw new AppError(500, "Failed to create user");
    }
    studentData.userId = result[0]._id;
    studentData.id = result[0].id;
    const student = await studentModel.create([studentData], { session });

    if (!student) {
      throw new AppError(500, "Failed to create Student");
    }
    await session.commitTransaction();
    await session.endSession();
    return student;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    // console.error("Error creating student:", error);
    // throw new Error("Failed to create student");
  }
};

export const userService = {
  createStudentDB,
};
