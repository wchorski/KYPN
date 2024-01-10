/*
  Warnings:

  - You are about to drop the `_Product_rentals` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[rental]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Made the column `type` on table `CartItem` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `type` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Product_rentals" DROP CONSTRAINT "_Product_rentals_A_fkey";

-- DropForeignKey
ALTER TABLE "_Product_rentals" DROP CONSTRAINT "_Product_rentals_B_fkey";

-- AlterTable
ALTER TABLE "CartItem" ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "rental" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "_Product_rentals";

-- CreateIndex
CREATE UNIQUE INDEX "Order_rental_key" ON "Order"("rental");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_rental_fkey" FOREIGN KEY ("rental") REFERENCES "Rental"("id") ON DELETE SET NULL ON UPDATE CASCADE;
