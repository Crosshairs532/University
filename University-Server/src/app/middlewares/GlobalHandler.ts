import { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response) => {
  let statusCode = 200;
  let message = err?.messsage || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  });
};
