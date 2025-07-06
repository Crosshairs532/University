import { model, Schema } from "mongoose";
import { TSemesterRegistration } from "./semester_registration.interface";

const semesterRegistrationSchema = new Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    ref: "AcademicSemester",
    unique: true,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["UPCOMING", "ONGOING", "ENDED"],
      message: "{VALUE} is not supported",
    },
  },
  minCredit: {
    type: Number,
    required: true,
    default: 3,
  },
  maxCredit: {
    type: Number,
    required: true,
    default: 12,
  },
});
export const semesterRegistrationModel = model<TSemesterRegistration>(
  "semesterRegistration",
  semesterRegistrationSchema
);
