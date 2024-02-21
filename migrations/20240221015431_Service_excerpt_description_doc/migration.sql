/*
  Warnings:

  - The `description` column on the `Service` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "excerpt" TEXT NOT NULL DEFAULT '',
DROP COLUMN "description",
ADD COLUMN     "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]';
