-- CreateTable
CREATE TABLE "_Addon_products" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_products_AB_unique" ON "_Addon_products"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_products_B_index" ON "_Addon_products"("B");

-- AddForeignKey
ALTER TABLE "_Addon_products" ADD CONSTRAINT "_Addon_products_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_products" ADD CONSTRAINT "_Addon_products_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
