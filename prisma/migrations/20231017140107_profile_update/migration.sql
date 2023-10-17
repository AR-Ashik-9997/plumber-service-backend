-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'null';
