import { ZodError, ZodIssue } from "zod";

export const handleZodError = (err: ZodError) => {
  let statusCode = 400;
  let errorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message: "Zod Validation Error",
    errorSource,
  };
};

import mongoose from "mongoose";

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSource = Object.values(err.errors).map((val) => {
    return {
      path: val.name,
      message: val.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "validation Error",
    errorSource,
  };
};

export const handleCastError = (err: mongoose.Error.CastError) => {
  const statusCode = 400;
  const errorSource = [{ path: err.path, message: err.message }];
  return {
    statusCode,
    message: "Invalid Id",
    errorSource,
  };
};

export const handleDuplicateError = (err: any) => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extracted_msg = match && match[1];
  const errorSource = [
    { path: "", message: ` ${extracted_msg} is already exists ` },
  ];
  return {
    statusCode,
    message: "Duplicated Error",
    errorSource,
  };
};
