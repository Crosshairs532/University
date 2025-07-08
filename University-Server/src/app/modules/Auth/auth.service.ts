import status from "http-status";
import AppError from "../../utils/AppError";
import { userModel } from "../user/user.model";
import { TLogin } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configFiles } from "../../config";
const bcrypt = require("bcrypt");

const login = async (loginData: TLogin) => {
  //check if admin user exist.

  const isExist = await userModel.isUserExist(loginData?.id);

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
    loginData.password,
    isExist?.password
  );

  if (!passwordMatched) {
    throw new AppError(status.UNAUTHORIZED, "Password is incorrect!");
  }

  const jwtPayload = {
    userId: isExist?.id,
    role: isExist?.role,
  };
  const accessToken = jwt.sign(jwtPayload, configFiles.jwt_secret as string, {
    expiresIn: "2d",
  });

  return {
    accessToken,
    needPasswordChange: isExist?.needsPasswordChange,
  };
};

const changePassword = async (currentUser: JwtPayload, payload: any) => {
  //check if admin user exist.

  const isExist = await userModel.isUserExist(currentUser?.userId);

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
    payload.oldPassword,
    isExist?.password
  );

  if (!passwordMatched) {
    throw new AppError(
      status.UNAUTHORIZED,
      "Password do not match with old password"
    );
  }

  const hashPass = await bcrypt.hash(
    payload.newPassword,
    Number(configFiles.bcrypt_salt_rounds)
  );

  const result = await userModel.findOneAndUpdate(
    {
      id: currentUser?.userId,
      role: currentUser?.role,
    },
    {
      password: hashPass,
      needsPasswordChange: false,
    }
  );

  return result;
};

export const authService = {
  login,
  changePassword,
};
