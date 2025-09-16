/*
  Warnings:

  - You are about to drop the column `isActive` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isActive",
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false;
