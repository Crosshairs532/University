import { Request, Response } from "express";
import { userService } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  const { password, student } = req.body;

  try {
    const user = await userService.createStudentDB(password, student);
    res.status(200).send({
      success: true,
      data: user,
      message: "Student created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export const userController = { createStudent };
