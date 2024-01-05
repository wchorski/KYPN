/*
  Warnings:

  - You are about to drop the column `isForRental` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "isForRental",
ADD COLUMN     "isForRent" BOOLEAN NOT NULL DEFAULT false;
