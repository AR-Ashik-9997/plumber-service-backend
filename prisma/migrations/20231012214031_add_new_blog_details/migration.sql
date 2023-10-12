/*
  Warnings:

  - You are about to drop the column `bannarImage` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `blogs` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `image` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "bannarImage",
DROP COLUMN "description",
DROP COLUMN "details",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "blogDetails" (
    "id" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    "banner" TEXT,
    "details" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blogDetails" ADD CONSTRAINT "blogDetails_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
