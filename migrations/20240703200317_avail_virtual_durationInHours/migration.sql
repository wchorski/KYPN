/*
  Warnings:

  - You are about to drop the column `durationInHours` on the `Availability` table. All the data in the column will be lost.
  - Made the column `end` on table `Availability` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "durationInHours",
ALTER COLUMN "end" SET NOT NULL;
