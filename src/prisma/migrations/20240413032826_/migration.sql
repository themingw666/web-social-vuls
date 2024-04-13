/*
  Warnings:

  - You are about to drop the `Photo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_postid_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_postid_fkey";

-- DropForeignKey
ALTER TABLE "story" DROP CONSTRAINT "story_photoId_fkey";

-- DropTable
DROP TABLE "Photo";

-- DropTable
DROP TABLE "Video";

-- CreateTable
CREATE TABLE "photo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "postid" INTEGER NOT NULL,

    CONSTRAINT "photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "postid" INTEGER NOT NULL,

    CONSTRAINT "video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "story" ADD CONSTRAINT "story_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo" ADD CONSTRAINT "photo_postid_fkey" FOREIGN KEY ("postid") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video" ADD CONSTRAINT "video_postid_fkey" FOREIGN KEY ("postid") REFERENCES "post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
