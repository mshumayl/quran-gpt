/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `NotifyUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NotifyUser_userId_key" ON "NotifyUser"("userId");
