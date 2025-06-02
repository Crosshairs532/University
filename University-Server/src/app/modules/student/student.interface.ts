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
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TStudent = {
  userId: Types.ObjectId;
  name: TUserName;
  gender: "MALE" | "FEMALE";
  dateOfBirth: Date;
  email: String;
  contactNo: String;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  emergencyContactNo: String;
  presentAddress: String;
  permanentAddress: String;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: String;
  isDeleted: boolean;
};
