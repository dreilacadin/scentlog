-- DropForeignKey
ALTER TABLE "Perfume" DROP CONSTRAINT "Perfume_brandId_fkey";

-- AlterTable
ALTER TABLE "Perfume" ALTER COLUMN "brandId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Perfume" ADD CONSTRAINT "Perfume_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
