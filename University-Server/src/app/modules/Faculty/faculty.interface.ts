import { Types } from "mongoose";

type TUsername = {
  firstName: string;
  middleName?: String;
  lastName: String;
};

type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type TFaculty = {
  id: String;
  userId: Types.ObjectId;
  designation: String;
  name: TUsername;
  gender: "MALE" | "FEMALE";
  dateOfBirth: Date;
  email: String;
  contactNo: String;
  emergencyContactNo: string;
  bloodGroup?: TBloodGroup;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  isDeleted: boolean;
};
