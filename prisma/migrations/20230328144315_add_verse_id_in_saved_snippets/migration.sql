/*
  Warnings:

  - Added the required column `verseId` to the `SavedSnippets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SavedSnippets" ADD COLUMN     "verseId" TEXT NOT NULL;
