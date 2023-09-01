/*
  Warnings:

  - Added the required column `photo_public_id` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "photo_public_id" TEXT NOT NULL;
