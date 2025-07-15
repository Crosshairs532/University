import { startSession } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./course.constant";
import { TCourse, TCourseFaculty } from "./course.interface";
import { courseFacultyModel, courseModel } from "./course.model";
import path from "path";
import AppError from "../../utils/AppError";
import status from "http-status";

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

  // create transaction session

  const session = await startSession();

  try {
    session.startTransaction();
    const updateBasicInformation = await courseModel.findByIdAndUpdate(
      courseId,
      basicCourseInformation,
      {
        new: true,
        runValidators: true,
        session: session,
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
          session: session,
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
          session: session,
        }
      );
    }

    const result = await courseModel
      .findById(courseId)
      .populate("preRequisiteCourses.courseId");
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
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

const assignFaculty = async (
  courseId: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await courseFacultyModel.findByIdAndUpdate(
    courseId,
    {
      course: courseId,
      $addToSet: {
        faculties: {
          $each: payload,
        },
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  return result;
};

const assingedFaculties = (query: Record<string, unknown>) => {
  const result = new QueryBuilder(
    courseFacultyModel.find({}).populate([
      {
        path: "course",
      },
      {
        path: "faculties",
      },
    ]),
    query
  );
  return result.modelQuery;
};

const getCourseFaculties = async (courseId: string) => {
  const courseExist = await courseFacultyModel
    .findById(courseId)
    .populate("faculties");

  if (!courseExist) {
    throw new AppError(status.NOT_FOUND, "No Course found!");
  }
  return courseExist;
};

const removeFaculties = async (courseId: String, payload: string[]) => {
  const result = await courseFacultyModel.findByIdAndUpdate(
    courseId,
    {
      $pull: {
        faculties: {
          $in: payload,
        },
      },
    },
    {
      new: true,
    }
  );
  if (!result) {
    throw new AppError(status.BAD_REQUEST, "Failed to remove faculties");
  }
  return result;
};
export const courseService = {
  createCourse,
  getAllCourse,
  updateCourse,
  deleteCourse,
  getSingleCourse,
  assignFaculty,
  assingedFaculties,
  removeFaculties,
  getCourseFaculties,
};
