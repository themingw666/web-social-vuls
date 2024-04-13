-- CreateTable
CREATE TABLE "vulnerable" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "vulnerable_pkey" PRIMARY KEY ("id")
);
