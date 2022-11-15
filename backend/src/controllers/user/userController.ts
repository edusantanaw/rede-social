import { Request, Response } from "express";
import { validate } from "../../validations/userValidations";
import { user } from "../../prisma/client";
import bcrypt from "bcrypt";

interface User {
  name: string;
  email: string;
  actualPassword: string;
  password: string;
  confirmPassword: string;
  bio: string;
}

export class UserController {
  async getUserById(req: Request, res: Response) {
    const id = req.params.id;

    const userReq = await user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) res.status(400).json({ error: "User not found!" });

    res.status(200).json(userReq);
  }

  async update(req: Request, res: Response) {
    const { name, email, bio }: User = req.body;

    const perfilPhoto = req.files as Express.Multer.File[];
    const id = req.params.id;

    try {
      validate(name, "name");
      validate(email, "email");

      const findUser = await user.findFirst({
        where: {
          id: id,
        },
      });
      if (!findUser) throw "User not found!";

      if (findUser.email !== email) {
        const findEmail = await user.findFirst({
          where: {
            email: email,
          },
        });
        if (findEmail) throw "Email is already being used!";
      }
      const userUpdated = await user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          email: email,
          bio: bio,
          perfilPhoto: perfilPhoto[0].filename,
        },
      });

      res.status(201).json(userUpdated);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async updatePassword(req: Request, res: Response) {
    const { actualPassword, confirmPassword, password }: User = req.body;
    const id = req.params.id;
    try {
      validate(password, "password");

      if (password !== confirmPassword) throw "Passwords must be equals!";
      const findUser = await user.findFirst({
        where: {
          id: id,
        },
      });
      if (!findUser) throw "User not found!";

      const verifyPassword = await bcrypt.compare(actualPassword, findUser.password);
      if (!verifyPassword) throw "Password invalid!";

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      await user.update({
        where: {
          id: id,
        },
        data: {
          password: hashPassword,
        },
      });

      res.status(200).json("user updated successfully!");

    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}
