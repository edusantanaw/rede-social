/*
  Warnings:

  - You are about to drop the `Followed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Followed";

-- CreateTable
CREATE TABLE "socketId" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "socketId" TEXT NOT NULL,

    CONSTRAINT "socketId_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "socketId_userId_key" ON "socketId"("userId");

-- AddForeignKey
ALTER TABLE "socketId" ADD CONSTRAINT "socketId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
