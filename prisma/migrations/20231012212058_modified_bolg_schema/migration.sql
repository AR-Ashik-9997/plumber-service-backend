/*
  Warnings:

  - The `details` column on the `blogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "details",
ADD COLUMN     "details" JSONB;