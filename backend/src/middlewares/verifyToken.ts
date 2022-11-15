import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";
import auth from "../config/auth";

const { secret_token } = auth;

export function verifyTokenExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) return res.status(401).json({ message: "Token bot exists" });

  const token = authToken.split(" ")[1];

  try {
    verify(token, secret_token);

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Token invalido!",
    });
  }
}
