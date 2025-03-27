/*
  Warnings:

  - A unique constraint covering the columns `[stripeInvoiceId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OrderItem_subscriptionItem_key";

-- DropIndex
DROP INDEX "User_stripeCustomerId_idx";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "stripeInvoiceId" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeInvoiceId_key" ON "Order"("stripeInvoiceId");

-- CreateIndex
CREATE INDEX "OrderItem_subscriptionItem_idx" ON "OrderItem"("subscriptionItem");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");
