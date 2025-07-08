import catchAsync from "../utils/catchAsynch";
import AppError from "../utils/AppError";
import status from "http-status";

const auth = () => {
  return catchAsync((req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, "You are not authorized!");
    }
    next();
  });
};

export default auth;
