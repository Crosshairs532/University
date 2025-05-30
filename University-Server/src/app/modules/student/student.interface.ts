import { Types } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};
export type TStudent = {
  id: String;
  userId: Types.ObjectId;
  name: String;
  gender: "MALE" | "FEMALE";
  dateOfBirth: Date;
  email: String;
  contactNo: String;
  emergencyContactNo: String;
  presentAddress: String;
  permanentAddress: String;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: String;
  isDeleted: boolean;
};
