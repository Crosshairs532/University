import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./semester.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./semester.constant";

const semesterSchema = new Schema<TAcademicSemester>(
  {
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
      type: String,
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
  },
  {
    timestamps: true,
  }
);
semesterSchema.pre("save", async function (next, options) {
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExist) {
    throw new Error("Semester already exists!");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  semesterSchema
);
