/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "createdAt",
ALTER COLUMN "timeStarted" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Perfume" ADD COLUMN     "image" TEXT;
