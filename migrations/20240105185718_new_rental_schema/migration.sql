-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isForRental" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isForSale" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "rental_price" INTEGER;

-- CreateTable
CREATE TABLE "Rental" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "durationInHours" DECIMAL(5,2) NOT NULL DEFAULT 23,
    "location" TEXT NOT NULL DEFAULT '',
    "price" INTEGER NOT NULL DEFAULT 0,
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "customer" TEXT,
    "status" TEXT DEFAULT 'LEAD',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "google" JSONB DEFAULT '{"id":"","status":"","kind":"","htmlLink":""}',

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Addon_rentals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Product_rentals" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Rental_customer_idx" ON "Rental"("customer");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_rentals_AB_unique" ON "_Addon_rentals"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_rentals_B_index" ON "_Addon_rentals"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Product_rentals_AB_unique" ON "_Product_rentals"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_rentals_B_index" ON "_Product_rentals"("B");

-- AddForeignKey
ALTER TABLE "Rental" ADD CONSTRAINT "Rental_customer_fkey" FOREIGN KEY ("customer") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_rentals" ADD CONSTRAINT "_Addon_rentals_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_rentals" ADD CONSTRAINT "_Addon_rentals_B_fkey" FOREIGN KEY ("B") REFERENCES "Rental"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_rentals" ADD CONSTRAINT "_Product_rentals_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_rentals" ADD CONSTRAINT "_Product_rentals_B_fkey" FOREIGN KEY ("B") REFERENCES "Rental"("id") ON DELETE CASCADE ON UPDATE CASCADE;
