/*
  Warnings:

  - You are about to drop the column `booking` on the `CartItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cartItem]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_booking_fkey";

-- DropIndex
DROP INDEX "CartItem_booking_idx";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "cartItem" TEXT;

-- AlterTable
ALTER TABLE "CartItem" DROP COLUMN "booking";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_cartItem_key" ON "Booking"("cartItem");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_cartItem_fkey" FOREIGN KEY ("cartItem") REFERENCES "CartItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
