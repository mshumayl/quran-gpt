-- CreateTable
CREATE TABLE "LogSearch" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prompt" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "responseObj" TEXT,

    CONSTRAINT "LogSearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LogSearch_userId_key" ON "LogSearch"("userId");

-- AddForeignKey
ALTER TABLE "LogSearch" ADD CONSTRAINT "LogSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
