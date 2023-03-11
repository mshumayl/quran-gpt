-- CreateTable
CREATE TABLE "surahMetadata" (
    "id" TEXT NOT NULL,
    "surahNumber" INTEGER NOT NULL,
    "surahName" TEXT NOT NULL,
    "surahTName" TEXT NOT NULL,
    "surahEName" TEXT NOT NULL,
    "surahType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "verses" (
    "id" TEXT NOT NULL,
    "verseText" TEXT NOT NULL,
    "verseTranslation" TEXT NOT NULL,
    "verseNumber" TEXT NOT NULL,
    "surahNumber" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "surahMetadata_id_key" ON "surahMetadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "verses_id_key" ON "verses"("id");
