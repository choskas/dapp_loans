-- CreateTable
CREATE TABLE "Oportunities" (
    "id" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "username" TEXT NOT NULL,
    "apr" TEXT NOT NULL,
    "risk" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,

    CONSTRAINT "Oportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debts" (
    "id" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "investor" TEXT NOT NULL,
    "apr" TEXT NOT NULL,
    "risk" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,

    CONSTRAINT "Debts_pkey" PRIMARY KEY ("id")
);
