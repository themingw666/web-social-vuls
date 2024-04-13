/*
  Warnings:

  - Added the required column `namestr` to the `vulnerable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vulnerable" ADD COLUMN     "namestr" TEXT NOT NULL;
