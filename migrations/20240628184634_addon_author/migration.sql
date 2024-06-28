-- AlterTable
ALTER TABLE "Addon" ADD COLUMN     "author" TEXT;

-- CreateIndex
CREATE INDEX "Addon_author_idx" ON "Addon"("author");

-- AddForeignKey
ALTER TABLE "Addon" ADD CONSTRAINT "Addon_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
