import { Request, Response } from "express";
import { validate } from "../../validations/userValidations";
import { user } from "../../prisma/client";
import bcrypt from "bcrypt";
import { Token } from "../../provider/accessToken";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const tokenGenerate = new Token();

export default class AuthController {
  async create(req: Request, res: Response) {
    const { name, email, password, confirmPassword }: User = req.body;

    try {
      await validate(email, "email");
      await validate(password, "password");
      await validate(name, "name");
      if (password !== confirmPassword) throw "Passwords must be equals";

      const verifyUserAlreadyExists = await user.findFirst({
        where: {
          email: email,
        },
      });
      if (verifyUserAlreadyExists) throw "This email is already being used";

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await user.create({
        data: {
          name: name,
          email: email,
          password: hashPassword,
          perfilPhoto: "default.jpg"
        },
        select: {
          name: true,
          id: true,
          email: true,
          perfilPhoto: true,
          password: false,
        },
      });
      const accessToken = await tokenGenerate.generateAccessToken(newUser.id);

      const refreshToken = await tokenGenerate.genRefreshToken(newUser.id);

      const userResponse = newUser;

      res.status(201).json({ userResponse, accessToken, refreshToken });
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password }: User = req.body;

    try {
      await validate(email, "email");
      await validate(password, "password");

      const userReq = await user.findFirst({
        where: {
          email: email,
        },
        select: {
          name: true,
          id: true,
          email: true,
          perfilPhoto: true,
          password: true,
        },
      });

      if (!userReq) throw "User not find!";
      const comparePassword = await bcrypt.compare(password, userReq.password);

      if (!comparePassword) throw "Email/password invalid!";

      const accessToken = await tokenGenerate.generateAccessToken(userReq.id);
      const refreshToken = await tokenGenerate.genRefreshToken(userReq.id);

      const userResponse: { id: string; name: string; email: string, perfilPhoto: any } = {
        id: userReq.id,
        name: userReq.name,
        email: userReq.email,
        perfilPhoto: userReq.perfilPhoto
      };

      res.status(201).json({ userResponse, accessToken, refreshToken });
    } catch (error) {
      res.status(400).send({ error: error });
    }
  }
}
