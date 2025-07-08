import catchAsync from "../utils/catchAsynch";
import AppError from "../utils/AppError";
import status from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { configFiles } from "../config";
const auth = (...userRoles: string[]) => {
  return catchAsync((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
    }

    jwt.verify(token, configFiles.jwt_secret as string, (err, decoded) => {
      if (err) {
        throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
      }
      const { userId, role } = decoded as JwtPayload;

      if (userRoles && !userRoles.includes((decoded as JwtPayload).role)) {
        throw new AppError(status.UNAUTHORIZED, "You are not unauthorized!");
      }
      req.user = { userId, role };
      next();
    });
  });
};

export default auth;
