import { sign } from "jsonwebtoken";
import auth from "../config/auth";
import dayjs from "dayjs";
import { refreshToken } from "../prisma/client";

const { secret_token } = auth;



export class Token {
  async generateAccessToken(userId: string) {
    const expiresIn = dayjs().add(20, "minutes").unix();

    const token = sign( {}, secret_token, {
      subject: userId,
      expiresIn: expiresIn,
    });
    return  token ;
  }

  async genRefreshToken(userId: string) {
    const expiresIn = dayjs().add(3, "days").unix();
    const refresh = await refreshToken.create({
      data: {
        userId: userId,
        expiresIn: expiresIn,
      },
    });

    return refresh;
  }
}
