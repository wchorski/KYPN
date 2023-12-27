-- AlterTable
ALTER TABLE "Addon" ADD COLUMN     "status" TEXT DEFAULT 'DRAFT',
ADD COLUMN     "stripeProductId" TEXT NOT NULL DEFAULT '';
