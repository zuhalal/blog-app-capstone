-- AlterTable
ALTER TABLE "User" ADD COLUMN     "photo_public_id" TEXT,
ALTER COLUMN "photo_url" DROP NOT NULL;
