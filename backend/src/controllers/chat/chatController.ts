import { message } from "../../prisma/client";
import {Request, Response} from 'express'

export default class ChatMessage{

    async getAllMessage(req: Request, res: Response) {
        const {user, follower} = req.query

            console.log(user, follower)
        if(!user) return
        if(!follower) return
        const messages: any = await message.findMany({
            where: {
                userSend: user.toString(),
                userRec: follower.toString()
            }
        })
        if(messages.lenght === 0) res.status(400).json({error: "Message not found!"})

        res.status(200).json(messages)
    }

}