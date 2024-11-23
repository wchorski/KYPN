/*
  Warnings:

  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "canManageAnnouncements" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin";

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL DEFAULT '',
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "colorTheme" TEXT DEFAULT 'bg_c_plain',
    "type" TEXT DEFAULT 'NORMAL',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Post_privateAccess" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Page_privateAccess" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Post_privateAccess_AB_unique" ON "_Post_privateAccess"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_privateAccess_B_index" ON "_Post_privateAccess"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Page_privateAccess_AB_unique" ON "_Page_privateAccess"("A", "B");

-- CreateIndex
CREATE INDEX "_Page_privateAccess_B_index" ON "_Page_privateAccess"("B");

-- AddForeignKey
ALTER TABLE "_Post_privateAccess" ADD CONSTRAINT "_Post_privateAccess_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_privateAccess" ADD CONSTRAINT "_Post_privateAccess_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Page_privateAccess" ADD CONSTRAINT "_Page_privateAccess_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Page_privateAccess" ADD CONSTRAINT "_Page_privateAccess_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
