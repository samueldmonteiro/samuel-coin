-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "publicKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "identifier" TEXT NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_addresses" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "walletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wallet_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wallets_identifier_key" ON "wallets"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_addresses_address_key" ON "wallet_addresses"("address");

-- AddForeignKey
ALTER TABLE "wallet_addresses" ADD CONSTRAINT "wallet_addresses_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "wallets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
