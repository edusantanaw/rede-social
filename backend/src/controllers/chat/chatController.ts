import { client, message, room } from "../../prisma/client";
import { Request, Response } from "express";

interface user {
  id: string;
  userSend: string;
  userRec: string;
}

export default class ChatMessage {
  async getAllMessage(req: Request, res: Response) {
    const { user, follower } = req.query;

    if (!user) return;
    if (!follower) return;
    const messages: any = await message.findMany({
      where: {
        OR: [
          {
            userSend: user.toString(),
            userRec: follower.toString(),
          },
          {
            userSend: follower.toString(),
            userRec: user.toString(),
          },
        ],
      },
    });
    if (messages.lenght === 0)
      res.status(400).json({ error: "Message not found!" });

    res.status(200).json(messages);
  }

  async getUserMessage(req: Request, res: Response) {
    const id = req.params.id;

    try {
      if (!id) throw "User not found!";
      const messages: user[] = await client.$queryRaw`
          select distinct users.id, message."userRec", message."userSend", name, "perfilPhoto" from message
          inner join users on  users.id = message."userSend" 
          where "userSend" = ${id} or "userRec" = ${id}
        `;
      const filter = messages.filter((users: user) =>
        users.id !== id ? users : ""
      );
      res.status(200).json(filter);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }

  async getUsersRoom(req: Request, res: Response) {
    const { userId, followerId } = req.query;
    console.log(userId, followerId);
    try {
      if (!userId && !followerId) throw "Users not found!";

      const roomId = await room.findFirst({
        where: {
          OR: [
            {
              userId: userId?.toString(),
              userRecId: followerId?.toString(),
            },
            {
              userId: followerId?.toString(),
              userRecId: userId?.toString(),
            },
          ],
        },
      });

      if (!room) throw "Room not found!";
      console.log(room);
      res.status(200).json(roomId);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  }
}
