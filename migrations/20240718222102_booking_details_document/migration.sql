-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "details" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]';
