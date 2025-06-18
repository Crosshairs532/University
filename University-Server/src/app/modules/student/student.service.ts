import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import { studentModel } from "./student.model";
import { userModel } from "../user/user.model";

const getAllStudentsDB = async () => {
  try {
    const allStudents = await studentModel.find({}).populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
    return allStudents;
  } catch (error) {
    throw new AppError(500, "Error fetching students from the database");
  }
};

const getSingleStudent = async (studentId: any) => {
  const result = await studentModel.findOne({ id: studentId }).populate({
    path: "academicDepartment",
    populate: {
      path: "academicFaculty",
    },
  });
  return result;
};

const updateStudent = async (studentId: any, payload: any) => {
  const { name, guardian, localGuardian, ...others } = payload;
  const modifiedData = { ...others };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await studentModel.findOneAndUpdate(
    { id: studentId },
    payload,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteStudent = async (studentId: any) => {
  const session = await mongoose.startSession();
  try {
    (await session).startTransaction();
    const result = await studentModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      {
        new: true,
        session: session,
      }
    );

    if (!result) {
      throw new AppError(500, "Failed to delete student");
    }
    const deleteUser = await userModel.findOneAndUpdate(
      { id: studentId },
      { isDeleted: true },
      {
        new: true,
        session,
      }
    );

    if (!deleteUser) {
      throw new AppError(500, "Failed to delete user");
    }

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    (await session).abortTransaction();
    (await session).endSession();
  }
};
export const studentService = {
  getAllStudentsDB,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
