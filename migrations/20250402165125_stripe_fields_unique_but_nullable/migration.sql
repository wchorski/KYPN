/*
  Warnings:

  - A unique constraint covering the columns `[stripeCheckoutSessionId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripePaymentIntent]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "stripeCheckoutSessionId" DROP NOT NULL,
ALTER COLUMN "stripeCheckoutSessionId" DROP DEFAULT,
ALTER COLUMN "stripePaymentIntent" DROP NOT NULL,
ALTER COLUMN "stripePaymentIntent" DROP DEFAULT,
ALTER COLUMN "stripeInvoiceId" DROP NOT NULL,
ALTER COLUMN "stripeInvoiceId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "stripeCustomerId" DROP NOT NULL,
ALTER COLUMN "stripeCustomerId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeCheckoutSessionId_key" ON "Order"("stripeCheckoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripePaymentIntent_key" ON "Order"("stripePaymentIntent");
