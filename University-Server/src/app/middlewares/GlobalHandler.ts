import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import {
  handleCastError,
  handleDuplicateError,
  handleValidationError,
  handleZodError,
} from "./error";
import mongoose from "mongoose";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err?.statusCode || 500;
  let message = err?.messsage || "Something went wrong";

  type TErrorSource = { path: String | number; message: String }[];
  let errorSources: TErrorSource = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    const zodError = handleZodError(err);

    statusCode = zodError.statusCode;
    message = zodError.message;
    errorSources = zodError.errorSource;
  } else if (err instanceof mongoose.Error.ValidationError) {
    const mongooseError = handleValidationError(err);
    statusCode = mongooseError.statusCode;
    message = mongooseError.message;
    errorSources = mongooseError.errorSource;
  } else if (err.name == "castError") {
    const castError = handleCastError(err);
    statusCode = castError.statusCode;
    message = castError.message;
    errorSources = castError.errorSource;
  } else if (err.code == 11000) {
    const castError = handleCastError(err);
    statusCode = castError.statusCode;
    message = castError.message;
    errorSources = castError.errorSource;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSource;
  }
  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    // error: err,
  });
};
