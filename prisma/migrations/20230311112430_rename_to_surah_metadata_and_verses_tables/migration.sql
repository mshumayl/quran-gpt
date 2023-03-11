/*
  Warnings:

  - You are about to drop the `surahMetadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "surahMetadata";

-- DropTable
DROP TABLE "verses";

-- CreateTable
CREATE TABLE "SurahMetadata" (
    "id" TEXT NOT NULL,
    "surahNumber" INTEGER NOT NULL,
    "surahName" TEXT NOT NULL,
    "surahTName" TEXT NOT NULL,
    "surahEName" TEXT NOT NULL,
    "surahType" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Verses" (
    "id" TEXT NOT NULL,
    "verseText" TEXT NOT NULL,
    "verseTranslation" TEXT NOT NULL,
    "verseNumber" TEXT NOT NULL,
    "surahNumber" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SurahMetadata_id_key" ON "SurahMetadata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Verses_id_key" ON "Verses"("id");
