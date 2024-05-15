-- CreateTable
CREATE TABLE "message" (
    "userSender_id" INTEGER NOT NULL,
    "userRecipient_id" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("userSender_id","userRecipient_id")
);

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userSender_id_fkey" FOREIGN KEY ("userSender_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userRecipient_id_fkey" FOREIGN KEY ("userRecipient_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
