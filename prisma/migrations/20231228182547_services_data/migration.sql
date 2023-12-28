/*
  Warnings:

  - You are about to drop the `servicesDetails` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `feature1` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feature2` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feature3` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `feature4` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "servicesDetails" DROP CONSTRAINT "servicesDetails_serviceId_fkey";

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "feature1" TEXT NOT NULL,
ADD COLUMN     "feature2" TEXT NOT NULL,
ADD COLUMN     "feature3" TEXT NOT NULL,
ADD COLUMN     "feature4" TEXT NOT NULL;

-- DropTable
DROP TABLE "servicesDetails";
