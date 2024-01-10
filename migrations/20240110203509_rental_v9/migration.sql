/*
  Warnings:

  - The `delivery` column on the `Rental` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "delivery",
ADD COLUMN     "delivery" BOOLEAN NOT NULL DEFAULT false;
