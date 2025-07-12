import status from "http-status";
import AppError from "../../utils/AppError";
import { userModel } from "../user/user.model";
import { TLogin } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configFiles } from "../../config";
import { createToken } from "../../utils/createToken";
import sendEmail from "../../utils/sendEmail";
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

  const accessToken = createToken(
    jwtPayload,
    configFiles.jwt_secret as string,
    "2d" as string
  );
  const refreshToken = createToken(
    jwtPayload,
    configFiles.jwt_secret as string,
    "365d" as string
  );

  return {
    accessToken,
    refreshToken,
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

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
  }

  const decoded = await jwt.verify(token, configFiles.jwt_secret as string);

  if (!decoded) {
    throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
  }

  const { userId, iat } = decoded as JwtPayload;

  const user = await userModel.isUserExist(userId);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  // check if user is deleted or not
  if (user?.isDeleted) {
    throw new AppError(status.FORBIDDEN, "This user account Does not exist!");
  }

  if (userModel.JwtIssueCheck(user?.passwordChangedAt, iat as number)) {
    throw new AppError(status.UNAUTHORIZED, "You are not unauthorized!");
  }

  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    configFiles.jwt_secret as string,
    "2d" as string
  );

  return accessToken;
};

const forgetPassword = async (id: string) => {
  const user = await userModel.isUserExist(id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  // check if user is deleted or not
  if (user?.isDeleted) {
    throw new AppError(status.FORBIDDEN, "This user account Does not exist!");
  }

  // check is user status
  if (user?.status == "blocked") {
    throw new AppError(status.FORBIDDEN, "This user account has been blocked!");
  }
  const jwtPayload = {
    userId: id,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    configFiles.jwt_secret as string,
    "10m" as string
  );

  const url = `http://localhost:3000?id=${id}&token=${accessToken}`;

  sendEmail(url);
};

const resetPassword = async (
  token: string,
  newPasswordData: { id: string; newPassword: string }
) => {
  const { id, newPassword } = newPasswordData;

  const user = await userModel.isUserExist(id);

  if (!user) {
    throw new AppError(status.NOT_FOUND, "This user is not found!");
  }

  // check if user is deleted or not
  if (user?.isDeleted) {
    throw new AppError(status.FORBIDDEN, "This user account Does not exist!");
  }
  const decoded = await jwt.verify(token, configFiles.jwt_secret as string);

  if (decoded?.userId !== id) {
    throw new AppError(status.FORBIDDEN, "Access Denied!");
  }

  const hashPass = await bcrypt.hash(
    newPassword,
    Number(configFiles.bcrypt_salt_rounds)
  );

  const result = await userModel.findByIdAndUpdate(id, {
    password: hashPass,
  });

  return result;
};

export const authService = {
  login,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
