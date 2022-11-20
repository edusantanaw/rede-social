-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userSend" TEXT NOT NULL,
    "userRec" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "message_userSend_key" ON "message"("userSend");

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userSend_fkey" FOREIGN KEY ("userSend") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userRec_fkey" FOREIGN KEY ("userRec") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
