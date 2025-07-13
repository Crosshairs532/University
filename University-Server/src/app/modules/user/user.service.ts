import { AcademicSemester } from "./../AcademicSemester/semester.model";
import { configFiles } from "../../config";
import { studentModel } from "../student/student.model";
import { Role, TUser } from "./user.interface";

import { userModel } from "./user.model";
import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import { generateStudentId } from "./utils/generateStudentId";
import { generateFacultyID } from "./utils/generateFacultyId";
import { facultyModel } from "../Faculty/faculty.model";
import { TAdmin } from "../Admin/admin.interface";
import { generateAdminID } from "./utils/genearateAdminId";
import status from "http-status";
import { Admin } from "../Admin/admin.model";
import verifyToken from "../Auth/auth.utils";
import { JwtPayload } from "jsonwebtoken";
import { Cloudinary } from "../../utils/Cloudinary";

const createStudentDB = async (
  file: any,
  password: string,
  studentData: any
) => {
  const user: Partial<TUser> = {};
  // create user
  user.password = password || (configFiles.default_password as string);
  user.role = "student";
  user.email = studentData.email;

  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    user.id = (await generateStudentId(academicSemester!)) as string;

    const imageName = `${user.id}-${studentData.name.firstName}`;
    const path = file?.path;
    const { secure_url } = await Cloudinary(imageName, path);

    const result = await userModel.create([user], { session });
    // create student
    if (!result.length) {
      throw new AppError(500, "Failed to create user");
    }
    studentData.userId = result[0]._id;
    studentData.id = result[0].id;
    studentData.profileImg = secure_url;

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

const createFaculty = async (password: string, facultyData: any) => {
  const user: Partial<TUser> = {};
  user.role = "faculty";
  user.password = password || configFiles.default_password;
  user.email = facultyData.email;

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();
    user.id = (await generateFacultyID()) as unknown as string;

    const facultyUser = await userModel.create([user], { session });

    if (!facultyUser.length) {
      throw new AppError(500, "Failed to create faculty user!");
    }
    facultyData.id = user.id;
    facultyData.userId = facultyUser[0]._id;

    const faculty = await facultyModel.create([facultyData], { session });

    if (!faculty.length) {
      throw new AppError(500, "Failed to create Faculty!");
    }
    await session.commitTransaction();
    await session.endSession();
  } catch {
    await session.abortTransaction();
    await session.endSession();
  }
};
const createAdmin = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (configFiles.default_password as string);

  //set admin role
  userData.role = "admin";
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminID();

    // create a user (transaction-1)
    const newUser = await userModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create admin");
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(status.BAD_REQUEST, "Failed to create admin");
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (token: string) => {
  const { userId, role } = (await verifyToken(token)) as JwtPayload;
  let result = null;
  if (role == "student") {
    result = await studentModel?.findOne({ id: userId });
  }
  if (role == "faculty") {
    result = await facultyModel?.findOne({ id: userId });
  }
  if (role == "admin") {
    result = await Admin?.findOne({ id: userId });
  }

  return result;
};

const changeStatus = async (id: string, payload: any) => {
  const result = await userModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const userService = {
  createStudentDB,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
