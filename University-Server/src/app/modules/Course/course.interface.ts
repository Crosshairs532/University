import { Types } from "mongoose";

export type preRequisiteCourse = {
  courseId: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: Number;
  credits: Number;
  isDeleted: boolean;
  preRequisiteCourses: preRequisiteCourse[];
};
