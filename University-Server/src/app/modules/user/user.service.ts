import { configFiles } from "../../config";
import { studentModel } from "../student/student.model";
import { TUser } from "./user.interface";

import { userModel } from "./user.model";

const createStudentDB = async (password: string, studentData: any) => {
  const user: Partial<TUser> = {};
  // create user
  user.password = password || (configFiles.default_password as string);
  user.role = "student";
  user.id = "213000";

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
