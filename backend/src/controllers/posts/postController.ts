import { post } from "../../prisma/client";
import { Request, Response } from "express";
import { Token } from "../../provider/accessToken";

const TokenProvider = new Token();
export class PostController {
  async newPost(req: Request, res: Response) {
    const { content } = req.body;
    const image = req.files as Express.Multer.File[];
    const user = await TokenProvider.getUserByToken(req);

    try {
      if (!user) throw "User is invalid";
      if (!image && !content) throw "Content/image not find!";

      await post.create({
        data: {
          authorId: user.id,
          content: content,
          image: image[0].filename,
        },
      });
      res.status(201).json("post created ");
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getPostById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const postReq = await post.findFirst({
        where: {
          id: id,
        },
      });
      if (!postReq) throw "Post not find!";

      res.status(200).send(postReq);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}
