import { Request, Response } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response) => {
  let statusCode = err?.statusCode || 500;
  let message = err?.messsage || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  });
};
