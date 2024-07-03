/*
  Warnings:

  - You are about to drop the column `durationInHours` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `durationInHours` on the `Rental` table. All the data in the column will be lost.
  - Made the column `end` on table `Rental` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "durationInHours";

-- AlterTable
ALTER TABLE "Rental" DROP COLUMN "durationInHours",
ALTER COLUMN "end" SET NOT NULL;
