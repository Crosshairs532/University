import { model, Schema } from "mongoose";
import { TFaculty } from "./faculty.interface";

const userNameSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    require: [true, "First Name is required"],
    maxLength: [20, "First name cannot be greater than 20"],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: [20, "Last Name cannot be greater than 20"],
  },
});
const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, "Faculty is is required"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "User",
    },
    designation: {
      type: String,
      require: [true, "Designation is required"],
    },
    name: userNameSchema,
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      require: true,
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      require: [true, "Email is required"],
    },
    contactNo: { type: String, required: [true, "Contact number is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        messsage: "{VALUE} is a valid blood type",
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImage: { type: String, default: "" },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "academicDepartment",
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const facultyModel = model<TFaculty>("faculty", facultySchema);
