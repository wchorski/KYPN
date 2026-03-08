/*
  Warnings:

  - You are about to drop the column `buisnessDays` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `buisnessHourClosed` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `buisnessHourOpen` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `buisnessHourClosed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `buisnessHourOpen` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "buisnessDays",
DROP COLUMN "buisnessHourClosed",
DROP COLUMN "buisnessHourOpen",
ADD COLUMN     "businessDays" JSONB NOT NULL DEFAULT '[0,1,2,3,4,5,6]',
ADD COLUMN     "businessHourClosed" TEXT DEFAULT '18:00:00',
ADD COLUMN     "businessHourOpen" TEXT DEFAULT '09:00:00';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "buisnessHourClosed",
DROP COLUMN "buisnessHourOpen",
ADD COLUMN     "businessHourClosed" TEXT DEFAULT '18:00:00',
ADD COLUMN     "businessHourOpen" TEXT DEFAULT '09:00:00';
