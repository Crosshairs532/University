import mongoose from "mongoose";
import AppError from "../../utils/AppError";
import { studentModel } from "./student.model";
import { userModel } from "../user/user.model";
import QueryBuilder from "../../builder/QueryBuilder";

const getAllStudentsDB = async (query: Record<string, unknown>) => {
  const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  const searchTerms = ["email", "name.firstName", "presentAddress"];
  const studentQuery = new QueryBuilder(
    studentModel.find().populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    }),
    query
  )
    .search(searchTerms)
    .filter(excludeFields)
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  const meta = await studentQuery.countTotal();
  return {
    result,
    meta,
  };

  // if (query.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = studentModel.find({
  //   $or: ["email", "name.firstName", "presentAddress"].map((item) => ({
  //     [item]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });

  // const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
  // excludeFields.forEach((field) => delete queryObj[field]);

  // const filterQuery = await searchQuery.find(queryObj).populate({
  //   path: "academicDepartment",
  //   populate: {
  //     path: "academicFaculty",
  //   },
  // });

  // let sort = "-createdAt";

  // if (query.sort) {
  //   sort = query?.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);

  // let limit = 10;
  // let page = 1;
  // let skip = 0;

  // 1 -> 0, 2 -> 10 , 3 -> 20
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = await paginateQuery.limit(limit);

  // let fields = "-_v";

  // if (query.fields) {
  //   const fields = (query.fields as string).split(",").join(" ");
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  // return allStudents;
  // } catch (error) {
  //   throw new AppError(500, "Error fetching students from the database");
  // }
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
