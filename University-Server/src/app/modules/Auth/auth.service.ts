import status from "http-status";
import AppError from "../../utils/AppError";
import { userModel } from "../user/user.model";
import { TLogin } from "./auth.interface";
const bcrypt = require("bcrypt");

const login = async (loginData: TLogin) => {
  //check if admin user exist.

  const isExist = await userModel.isUserExist(loginData.id);

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  // check if user is deleted or not
  if (isExist?.isDeleted) {
    throw new AppError(status.FORBIDDEN, "This user account Does not exist!");
  }

  // check is user status
  if (isExist?.status == "blocked") {
    throw new AppError(status.FORBIDDEN, "This user account has been blocked!");
  }

  const passwordMatched = await userModel.checkPassword(
    isExist?.password,
    loginData.password
  );

  if (!passwordMatched) {
    throw new AppError(status.UNAUTHORIZED, "Password is incorrect!");
  }
};

export const authService = {
  login,
};
