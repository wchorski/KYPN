/*
  Warnings:

  - You are about to drop the column `canManageCart` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeProductId]` on the table `Addon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripePriceId]` on the table `Addon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeId]` on the table `Coupon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeProductId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripePriceId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeProductId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripePriceId]` on the table `Service` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Coupon_stripeId_idx";

-- DropIndex
DROP INDEX "Product_stripePriceId_idx";

-- DropIndex
DROP INDEX "Product_stripeProductId_idx";

-- AlterTable
ALTER TABLE "Addon" ALTER COLUMN "stripeProductId" DROP NOT NULL,
ALTER COLUMN "stripeProductId" DROP DEFAULT,
ALTER COLUMN "stripePriceId" DROP NOT NULL,
ALTER COLUMN "stripePriceId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Coupon" ALTER COLUMN "stripeId" DROP NOT NULL,
ALTER COLUMN "stripeId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "stripeProductId" DROP NOT NULL,
ALTER COLUMN "stripeProductId" DROP DEFAULT,
ALTER COLUMN "stripePriceId" DROP NOT NULL,
ALTER COLUMN "stripePriceId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "canManageCart",
ADD COLUMN     "canManageCarts" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Service" ALTER COLUMN "stripeProductId" DROP NOT NULL,
ALTER COLUMN "stripeProductId" DROP DEFAULT,
ALTER COLUMN "stripePriceId" DROP NOT NULL,
ALTER COLUMN "stripePriceId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "SubscriptionItem" ALTER COLUMN "stripeSubscriptionId" DROP NOT NULL,
ALTER COLUMN "stripeSubscriptionId" DROP DEFAULT,
ALTER COLUMN "stripeSubscriptionItemId" DROP NOT NULL,
ALTER COLUMN "stripeSubscriptionItemId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "SubscriptionPlan" ALTER COLUMN "stripeProductId" DROP NOT NULL,
ALTER COLUMN "stripeProductId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Addon_stripeProductId_key" ON "Addon"("stripeProductId");

-- CreateIndex
CREATE UNIQUE INDEX "Addon_stripePriceId_key" ON "Addon"("stripePriceId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_stripeId_key" ON "Coupon"("stripeId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_stripeProductId_key" ON "Product"("stripeProductId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_stripePriceId_key" ON "Product"("stripePriceId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_stripeProductId_key" ON "Service"("stripeProductId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_stripePriceId_key" ON "Service"("stripePriceId");
