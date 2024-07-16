/*
  Warnings:

  - You are about to drop the column `document_data` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `document_name` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "document_data",
DROP COLUMN "document_name";

-- CreateTable
CREATE TABLE "document" (
    "documentid" SERIAL NOT NULL,
    "document_name" TEXT NOT NULL,
    "document_data" TEXT NOT NULL,
    "document_ext" TEXT NOT NULL,
    "postid" INTEGER NOT NULL,

    CONSTRAINT "document_pkey" PRIMARY KEY ("documentid")
);

-- AddForeignKey
ALTER TABLE "document" ADD CONSTRAINT "document_postid_fkey" FOREIGN KEY ("postid") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
