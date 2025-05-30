import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import express from "express";
import userRoutes from "./app/modules/user/user.route";
import cors from "cors";
import studentRoutes from "./app/modules/student/student.route";
import notFound from "./app/middlewares/not-found";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("University Server");
});

app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/user", userRoutes);

//global error handler
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 200;
  let message = err?.messsage || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  });
};
app.use(globalErrorHandler);

app.use(notFound);
export default app;
