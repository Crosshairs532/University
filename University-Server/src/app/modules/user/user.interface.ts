import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "student" | "admin" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserModelType extends Model<TUser> {
  isUserExist(id: string): Promise<TUser>;
  checkPassword(loginPass: string, storedPass: string): Promise<boolean>;
}
