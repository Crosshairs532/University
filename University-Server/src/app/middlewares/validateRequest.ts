import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

const schemaValidation = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const result = await schema.parseAsync({
        body: data,
      });
    } catch (error) {
      next(error);
    }
  };
};
export default schemaValidation;
