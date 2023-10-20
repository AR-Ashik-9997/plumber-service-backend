/*
  Warnings:

  - You are about to drop the `blogDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `blog` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blogDetails" DROP CONSTRAINT "blogDetails_blogId_fkey";

-- AlterTable
ALTER TABLE "blogs" ADD COLUMN     "blog" TEXT NOT NULL;

-- DropTable
DROP TABLE "blogDetails";
