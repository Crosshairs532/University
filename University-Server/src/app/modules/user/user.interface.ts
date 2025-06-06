import { Model } from "mongoose";

export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: "student" | "admin" | "faculty";
  status: "in-progress" | "blocked";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
// interface UserModelType extends Model<TUser> {

// }
