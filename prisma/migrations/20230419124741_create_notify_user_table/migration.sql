-- CreateTable
CREATE TABLE "NotifyUser" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "modalDisplayed" BOOLEAN NOT NULL DEFAULT false,
    "isInNotifyList" BOOLEAN,

    CONSTRAINT "NotifyUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotifyUser" ADD CONSTRAINT "NotifyUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
