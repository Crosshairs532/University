import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import notFound from "./app/middlewares/not-found";
import { globalErrorHandler } from "./app/middlewares/GlobalHandler";
import router from "./app/routes";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("University Server");
});

app.use("/api/v1", router);

//global error handler

app.use(globalErrorHandler);
app.use(notFound);

export default app;
