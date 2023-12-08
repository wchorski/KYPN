-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "allow_comments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
ADD COLUMN     "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "excerpt" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "featured_image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "featured_video" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "pinned" INTEGER DEFAULT 0,
ADD COLUMN     "status" TEXT DEFAULT 'DRAFT',
ADD COLUMN     "template" TEXT DEFAULT 'FULLWIDTH',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '';
