import { sign } from "jsonwebtoken";
import auth from "../config/auth";
import dayjs from "dayjs";
import { refreshToken, user } from "../prisma/client";
import { Request, response } from "express";
import jwt from "jsonwebtoken";

const { secret_token } = auth;

export class Token {
  async generateAccessToken(userId: string) {
    const expiresIn = dayjs().add(20, "minutes").unix();

    const token = sign({}, secret_token, {
      subject: userId,
      expiresIn: expiresIn,
    });
    return token;
  }

  async genRefreshToken(userId: string) {
    const expiresIn = dayjs().add(3, "days").unix();

    console.log(userId);
    const veriftRefresExists = await refreshToken.findMany({
      where: {
        userId: userId,
      },
    });
    if (veriftRefresExists) {
      await refreshToken.deleteMany({
        where: {
          userId: userId,
        },
      });
    }

    const refresh = await refreshToken.create({
      data: {
        expiresIn,
        userId,
      },
    });

    return refresh;
  }

  async getUserByToken(req: Request) {
    const tokenReq = req.headers.authorization;

    if (!tokenReq) return;

    const token = tokenReq.split(" ")[1];
    const decoded = jwt.verify(token, secret_token);
    const userId = decoded.sub?.toString();

    const userToken = await user.findFirst({
      where: {
        id: userId,
      },
    });

    return userToken;
  }
}
