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
  const { preRequisiteCourses, ...basicCourseInformation } = courseData;

  const updateBasicInformation = await courseModel.findByIdAndUpdate(
    courseId,
    basicCourseInformation,
    {
      new: true,
      runValidators: true,
    }
  );

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletePrePrerequisites = preRequisiteCourses
      .filter((id) => id.courseId && id.isDeleted)
      .map((id) => id.courseId);
    const deletedPreRequisiteCourses = await courseModel.findByIdAndUpdate(
      courseId,
      {
        $pull: {
          preRequisiteCourses: {
            courseId: {
              $in: [deletePrePrerequisites],
            },
          },
        },
      },
      {
        new: true,
      }
    );
    const updateNewPreRequisiteCourses = preRequisiteCourses.filter(
      (id) => id.courseId && !id.isDeleted
    );

    const newUpdated = await courseModel.findByIdAndUpdate(
      { _id: courseId },
      {
        $addToSet: {
          preRequisiteCourses: {
            $each: updateNewPreRequisiteCourses,
          },
        },
      },
      {
        new: true,
      }
    );
  }

  const result = await courseModel
    .findById(courseId)
    .populate("preRequisiteCourses.courseId");
  return result;
};
const getSingleCourse = async (id: string) => {
  const result = await courseModel.findById(id);
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
  getSingleCourse,
};
