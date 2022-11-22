/*
  Warnings:

  - You are about to drop the `socketId` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "socketId" DROP CONSTRAINT "socketId_userId_fkey";

-- DropTable
DROP TABLE "socketId";

-- CreateTable
CREATE TABLE "room" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userRecId" TEXT NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_userRecId_fkey" FOREIGN KEY ("userRecId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
