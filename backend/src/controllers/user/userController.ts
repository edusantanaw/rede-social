import { Request, Response } from "express";
import { validate } from "../../validations/userValidations";
import { user, client, follows } from "../../prisma/client";
import bcrypt from "bcrypt";
import { Token } from "../../provider/accessToken";

interface User {
  name: string;
  email: string;
  actualPassword: string;
  password: string;
  confirmPassword: string;
  bio: string;
}

const tokenPorvider = new Token();

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

    const perfilPhoto = req.file as Express.Multer.File;
    const id = req.params.id;

    try {
      console.log(perfilPhoto)
      console.log(name)
      await validate(name, "name");
      if(email) await validate(email, "email");

      const findUser = await user.findFirst({
        where: {
          id: id,
        },
      });
      if (!findUser) throw "User not found!";
      let photo = ''
      if(perfilPhoto) photo =perfilPhoto.filename

      if (email && findUser.email !== email) {
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
          perfilPhoto: photo
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

      const verifyPassword = await bcrypt.compare(
        actualPassword,
        findUser.password
      );
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

  async findUserByName(req: Request, res: Response) {
    const name = req.params.name;

    try {
      if (!name) throw "Name invalid!";
      const users = await client.$queryRaw`
            select * from users
            where name like ${`%${name}%`}
        `;

      if (!users) throw "User not found!";

      res.status(201).json(users);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async addFollow(req: Request, res: Response) {
    // follower user
    const id = req.params.id;

    // user token
    const userByToken = await tokenPorvider.getUserByToken(req);

    try {
      if (!id) throw "Id invalid!";
      if (!userByToken) throw "Token is missing!";

      const findUser = await user.findFirst({
        where: {
          id: id,
        },
      });
      if (!findUser) throw "User not found";
      if (!findUser.name) throw "User not found!";

      await follows.create({
        data: {
          followerId: userByToken.id,
          followingId: findUser.id,
        },
      });
      res.status(200).json("Following with success!");
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getUserFollowers(req: Request, res: Response) {
    const id = req.params.id;

    const followers = await follows.findMany({
      where: {
        followerId: id,
      },
    });

    if (followers.length === 0)
      return res.status(400).json({ error: "not found any follower!" });
    console.log(followers);
    res.status(200).json(followers);
  }
  async getUserFollowing(req: Request, res: Response) {
    const id = req.params.id;

    const followings = await follows.findMany({
      where: {
        followingId: id,
      },
    });

    if (followings.length === 0)
      return res.status(400).json({ error: "not found any follower!" });
    res.status(200).json(followings);
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await user.findMany();
    if (users.length === 0)
      return res.status(400).json({ error: "User not found!" });
    res.status(200).send(users);
  }
}

