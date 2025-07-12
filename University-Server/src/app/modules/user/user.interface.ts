import { Model } from "mongoose";

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt: Date;
  role: "student" | "admin" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserModelType extends Model<TUser> {
  isUserExist(id: string): Promise<TUser>;
  checkPassword(loginPass: string, storedPass: string): Promise<boolean>;
  JwtIssueCheck(passwordChange: Date, issueDate: number): boolean;
}
