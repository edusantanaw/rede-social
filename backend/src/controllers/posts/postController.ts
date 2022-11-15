import { post, like, client } from "../../prisma/client";
import { Request,  Response } from "express";
import { Token } from "../../provider/accessToken";

const tokenPorvider = new Token();
export class PostController {
  async newPost(req: Request, res: Response) {
    const { content } = req.body;
    const image = req.files as Express.Multer.File[];
    const user = await tokenPorvider.getUserByToken(req);

    try {
      if (!user) throw "User is invalid";
      if (!image && !content) throw "Content/image not find!";

      const newPost = await post.create({
        data: {
          authorId: user.id,
          content: content,
          image: image[0].filename && image[0].filename,
        },
      });
      
      res.status(201).json(newPost);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getPostById(req: Request, res: Response) {
    const id = req.params.id;

    try {
      const postReq = await client.$queryRaw`
        select posts.id, content, image  from posts 
        inner join likes    on likes."postId" = posts.id
        where posts.id = ${id};  
       
      `;
      if (!postReq) throw "Post not find!";

      res.status(200).send(postReq);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { content } = req.body;
    const image = req.files as Express.Multer.File[];
    const id = req.params.id;

    try {
      if (!image && !content) throw "Content/image invalid!";
      const findPost = await post.findFirst({
        where: {
          id: id,
        },
      });
      if (!findPost) throw "Post not found!";

      const postUpdated = await post.update({
        where: {
          id: id,
        },
        data: {
          image: image[0].filename,
          content: content,
        },
      });
      res.status(200).json(postUpdated);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async deletePost(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const findPost = await post.findFirst({
        where: {
          id: id,
        },
      });
      if (!findPost) throw "Post no found!";

      await post.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json("Post deleted!");
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async addLike(req: Request, res: Response) {
    const postId = req.params.post;
    const userToken = await tokenPorvider.getUserByToken(req);

    try {
      if (!postId) throw "Post invalid!";
      if (!userToken) throw "User not found!";

      const findPost = await post.findFirst({
        where: {
          id: postId,
        },
        select: {
          Like: true,
          id: true,
        },
      });
      if (!findPost) throw "Post not found";
      if (!findPost.id) throw "Post not found!";

      await like.create({
        data: {
          userId: userToken.id,
          postId: findPost.id,
        },
      });

      res.status(200).json("success");
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getAllPosts(req: Request, res: Response) {
    const posts = await post.findMany();
    if (!posts) return res.status(400).json({ error: "Post not found!" });
    res.status(200).json(posts);
  }

  async getPostByUser(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      if(!userId) throw "Id invalid"
      const posts: [] = await client.$queryRaw`
      select posts.content, posts.image from posts 
      inner join users on users.id = posts."authorId"
      where users.id = ${userId};
    `
      if (posts.length === 0) throw "No any post found";
    
      res.status(200).json(posts)

    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}
