import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./semester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./semester.constant";

const semesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    enum: AcademicSemesterName,
    required: true,
    message: "{VALUE} is not a valid semester",
  },
  code: {
    type: String,
    enum: AcademicSemesterCode,
    required: true,
    message: "{VALUE} is not a valid semester",
  },
  year: {
    type: Date,
    required: true,
    message: "Admission Year is required!",
  },
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  semesterSchema
);
