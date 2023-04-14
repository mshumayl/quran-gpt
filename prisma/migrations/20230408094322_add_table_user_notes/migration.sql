-- CreateTable
CREATE TABLE "UserNotes" (
    "id" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNotes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserNotes" ADD CONSTRAINT "UserNotes_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "SavedSnippets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
