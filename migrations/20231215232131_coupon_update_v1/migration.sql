/*
  Warnings:

  - Made the column `duration_in_months` on table `Coupon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Coupon" ALTER COLUMN "duration_in_months" SET NOT NULL;
