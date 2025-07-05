import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { courseModel } from "./course.model";

const createCourse = async (courseData: TCourse) => {
  const result = await courseModel.create(courseData);
  return result;
};
const getAllCourse = async (query: Record<string, unknown>) => {
  console.log("inside");
  const result = new QueryBuilder(
    courseModel.find({}).populate("preRequisiteCourses.courseId"),
    query
  )
    .search(searchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  return result?.modelQuery;
};
const updateCourse = async (courseId: string, courseData: TCourse) => {
  const result = await courseModel.findByIdAndUpdate(courseId, courseData, {
    new: true,
  });

  return result;
};
const deleteCourse = async (courseId: string) => {
  const result = await courseModel.findByIdAndUpdate(
    courseId,
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};
export const courseService = {
  createCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
};
