import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { facultyModel } from "./faculty.model";
import AppError from "../../utils/AppError";
import status from "http-status";
import { userModel } from "../user/user.model";
const FacultySearchableFields = [
  "email",
  "id",
  "contactNo",
  "emergencyContactNo",
  "name.firstName",
  "name.lastName",
  "name.middleName",
];

const getAllFaculty = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(
    facultyModel.find({}).populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    }),
    query
  )
    .search(FacultySearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  return result.modelQuery;
};

const singleFaculty = async (facultyId: string) => {
  const result = await facultyModel.findOne({ id: facultyId });
  return result;
};

const updateFaculty = async (facultyId: String, facultyData: any) => {
  const { name, ...remainingData } = facultyData;
  const modifiedData = { ...remainingData };

  if (name && Object.keys(name).length > 0) {
    for (const [Key, value] of Object.entries(name)) {
      modifiedData[`name.${Key}`] = value;
    }
  }
  const result = await facultyModel.findOneAndUpdate(
    { id: facultyId },
    modifiedData
  );

  return result;
};

const deleteFaculty = async (facultyId: String) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const result = await facultyModel.findOneAndUpdate(
      { id: facultyId },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      }
    );

    if (!result) {
      throw new AppError(status.BAD_REQUEST, "Failed to delete faculty");
    }

    const deleteUser = await userModel.findOneAndUpdate(
      { _id: result.userId },
      {
        isDeleted: true,
      },
      {
        new: true,
        session,
      }
    );
    await session.commitTransaction();
    await session.endSession();
    return deleteUser;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(err);
  }
};

export const facultyService = {
  getAllFaculty,
  singleFaculty,
  updateFaculty,
  deleteFaculty,
};
