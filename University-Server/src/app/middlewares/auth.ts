import catchAsync from "../utils/catchAsynch";
import AppError from "../utils/AppError";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configFiles } from "../config";
import { decode } from "punycode";
import { userModel } from "../modules/user/user.model";
const auth = (...userRoles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
    }

    const decoded = await jwt.verify(token, configFiles.jwt_secret as string);

    if (!decode) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
    }

    const { userId, role, iat } = decoded as JwtPayload;

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
    if (userRoles && !userRoles.includes((decoded as JwtPayload).role)) {
      throw new AppError(status.UNAUTHORIZED, "You are not unauthorized!");
    }
    req.user = { userId, role };
    next();
  });
};

export default auth;
