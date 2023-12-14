/*
  Warnings:

  - Made the column `price` on table `SubscriptionPlan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SubscriptionPlan" ALTER COLUMN "price" SET NOT NULL;
