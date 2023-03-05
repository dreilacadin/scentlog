/*
  Warnings:

  - You are about to drop the column `brand` on the `Perfume` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[brandId]` on the table `Perfume` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandId` to the `Perfume` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Perfume_name_brand_idx";

-- AlterTable
ALTER TABLE "Perfume" DROP COLUMN "brand",
ADD COLUMN     "brandId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Perfume_brandId_key" ON "Perfume"("brandId");

-- CreateIndex
CREATE INDEX "Perfume_name_idx" ON "Perfume"("name");

-- AddForeignKey
ALTER TABLE "Perfume" ADD CONSTRAINT "Perfume_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
