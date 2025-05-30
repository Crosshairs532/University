import { Request, Response } from "express";
import express from "express";
import userRoutes from "./app/modules/user/user.route";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("University Server");
});

app.use("/api/v1/user", userRoutes);
export default app;
