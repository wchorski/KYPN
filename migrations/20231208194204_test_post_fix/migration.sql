/*
  Warnings:

  - You are about to drop the column `allow_comments` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `dateCreated` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `dateModified` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `excerpt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `featured_image` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `featured_video` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `pinned` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `template` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_slug_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "allow_comments",
DROP COLUMN "content",
DROP COLUMN "dateCreated",
DROP COLUMN "dateModified",
DROP COLUMN "excerpt",
DROP COLUMN "featured_image",
DROP COLUMN "featured_video",
DROP COLUMN "pinned",
DROP COLUMN "slug",
DROP COLUMN "status",
DROP COLUMN "template",
DROP COLUMN "title";
