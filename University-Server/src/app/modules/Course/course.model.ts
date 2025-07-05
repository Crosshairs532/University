import { model, Schema } from "mongoose";
import { preRequisiteCourse, TCourse } from "./course.interface";
import { boolean, number } from "zod";

const preRequisiteCourse = new Schema<preRequisiteCourse>({
  courseId: {
    type: Schema.Types.ObjectId,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    required: [true, "Course title is required"],
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  preRequisiteCourses: [preRequisiteCourse],
});

export const courseModel = model<TCourse>("course", courseSchema);
