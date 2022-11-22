import { PrismaClient } from "@prisma/client";
export const client = new PrismaClient();

const { user, comments, post, like, refreshToken, follows, room, message } = client;

export { user, comments, post, like, refreshToken, follows, room, message };
