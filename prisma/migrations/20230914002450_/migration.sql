/*
  Warnings:

  - You are about to drop the column `walletAddress` on the `Debts` table. All the data in the column will be lost.
  - You are about to drop the column `walletAddress` on the `Oportunities` table. All the data in the column will be lost.
  - Added the required column `limit_date` to the `Debts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limit_date` to the `Oportunities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wallet_address_borrower` to the `Oportunities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Debts" DROP COLUMN "walletAddress",
ADD COLUMN     "limit_date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Oportunities" DROP COLUMN "walletAddress",
ADD COLUMN     "limit_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "wallet_address_borrower" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Borrower" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Borrower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Debts" ADD CONSTRAINT "Debts_id_fkey" FOREIGN KEY ("id") REFERENCES "Borrower"("id") ON DELETE CASCADE ON UPDATE CASCADE;
