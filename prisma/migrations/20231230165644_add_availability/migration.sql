-- CreateEnum
CREATE TYPE "Availablity" AS ENUM ('Available', 'NotAvailable');

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "availability" "Availablity" DEFAULT 'Available';
