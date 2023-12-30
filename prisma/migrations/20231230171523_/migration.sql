/*
  Warnings:

  - You are about to drop the column `feature1` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `feature2` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `feature3` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `feature4` on the `services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "services" DROP COLUMN "feature1",
DROP COLUMN "feature2",
DROP COLUMN "feature3",
DROP COLUMN "feature4",
ADD COLUMN     "features" JSONB[];
