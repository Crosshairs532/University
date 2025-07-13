import jwt from "jsonwebtoken";
import { configFiles } from "../../config";

const verifyToken = async (token: string) => {
  return await jwt.verify(token, configFiles.jwt_secret as string);
};

export default verifyToken;
