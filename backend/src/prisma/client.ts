import { PrismaClient } from '@prisma/client'
const client = new PrismaClient()

const { user, comments, post, like, refreshToken } = client;

export {user, comments, post, like, refreshToken}
