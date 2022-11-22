import { post, like, client, comments, user } from "../../prisma/client";
import { Request, Response } from "express";
import { Token } from "../../provider/accessToken";

const tokenPorvider = new Token();
export class PostController {
  async newPost(req: Request, res: Response) {
    const { content } = req.body;

    const image = req.file as Express.Multer.File;
    const user = await tokenPorvider.getUserByToken(req);

    try {
      if (!user) throw "User is invalid";
      if (!image && !content) throw "Content/image not find!";
      let img = "";
      if (image) img = image.filename;

      const newPost = await post.create({
        data: {
          authorId: user.id,
          content: content,
          image: img,
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
        select posts.id, content, name, users.id as userId, "perfilPhoto", image  from posts 
        inner join users on users.id = posts."authorId"
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

      // verify if like already exists
      const verifyLike: [] = await client.$queryRaw`
          select * from likes
          where "userId" = ${userToken.id}
          AND "postId" = ${postId}
      `;
      if (verifyLike.length > 0) {
        await like.deleteMany({
          where: {
            postId: postId,
            userId: userToken.id,
          },
        });
      } else {
        await like.create({
          data: {
            userId: userToken.id,
            postId: findPost.id,
          },
        });
      }
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
      if (!userId) throw "Id invalid";
      const posts: [] = await client.$queryRaw`
      select users.name, users.id, users."perfilPhoto", posts.id, posts.content, posts.image from posts 
      inner join users on users.id = posts."authorId"
      where users.id = ${userId}
      order by posts."createdAt" desc;
    `;
      if (posts.length === 0) throw "No any post found";

      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  // get all posts from users I'm following
  async myFeed(req: Request, res: Response) {
    const id = req.params.id;
    const { start, end } = req.query;

    const startToNumber = Number(start);
    const endToNumber = Number(end);

    try {
      if (!id) throw "User invalid!";
      const posts: string[] = await client.$queryRaw`
      select "authorId", name, posts.id, "perfilPhoto", image, content  from posts
      inner join "Follows" on  "Follows"."followerId" = posts."authorId"
      inner join users on users.id  = posts."authorId"
      where "Follows"."followingId" = ${id} OR posts."authorId" = ${id}
      order by posts."createdAt" desc
      Limit ${endToNumber} OFFSET ${startToNumber} 
        `;
      if (posts.length === 0) throw "Posts not found!";
      res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getUsersPostLike(req: Request, res: Response) {
    const id = req.params.id;
    const userLike = await like.findMany({
      where: {
        postId: id,
      },
    });
    if (!userLike) return res.status(400).json({ error: "Users not found!" });

    res.status(200).json(userLike);
  }

  async addComment(req: Request, res: Response) {
    const id = req.params.id;
    const { comment } = req.body;

    const userToken = await tokenPorvider.getUserByToken(req);
    if (!userToken) return res.status(400).json({ error: "User not found!" });
    try {
      if (!id) throw "User not found!";
      if (!comment) throw "Comment invalid!";
      const findPost = await post.findFirst({
        where: {
          id: id,
        },
      });
      if (!findPost) throw "Post not find";

      const newComment = await comments.create({
        data: {
          content: comment,
          authorId: userToken?.id,
          postId: findPost.id,
        },
      });
      res.status(200).json(newComment);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getPostComments(req: Request, res: Response) {
    const id = req.params.id;

    try {
      if (!id) res.status(400).json({ error: "Id invalid!" });
      const postComments: string[] = await client.$queryRaw`
      select  comments.content, comments.id , name, users.id as user, users."perfilPhoto" from comments 
      inner join users on users.id = comments."authorId"
      where comments."postId"= ${id}
    `;
      if (postComments.length === 0) throw "This post not have comments!";
      res.status(200).json(postComments);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}
