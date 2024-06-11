/*
  Warnings:

  - You are about to drop the column `payment_status` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "payment_status",
ALTER COLUMN "status" SET DEFAULT 'STARTED';
