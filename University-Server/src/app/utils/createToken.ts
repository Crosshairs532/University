import jwt, { JwtPayload, SignCallback, SignOptions } from "jsonwebtoken";

export const createToken = (
  payload: { userId: string; role: string },
  secret: string,
  expiresIn: string
): string => {
  const options = {
    expiresIn: expiresIn,
  };
  const token = jwt.sign(payload, secret, options);
  return token;
};
