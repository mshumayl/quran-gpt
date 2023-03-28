-- CreateTable
CREATE TABLE "SavedSnippets" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SavedSnippets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SavedSnippets" ADD CONSTRAINT "SavedSnippets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
