/*
  Warnings:

  - The primary key for the `message` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "message" DROP CONSTRAINT "message_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "message_pkey" PRIMARY KEY ("id", "userSender_id", "userRecipient_id");
