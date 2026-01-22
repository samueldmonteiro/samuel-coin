import { CreateWalletUseCase } from '@/application/use-cases/wallet/create-wallet.use-case';
import { Wallet } from '@/domain/entities/wallet.entity';
import { WalletCripto } from '@/infra/cripto/wallet.cripto';
import { PrismaService } from '@/infra/db/prisma/prisma.service';
import { PrismaWalletAddressRepository } from '@/infra/db/prisma/repositories/prisma-wallet-address.repository';
import { PrismaWalletRepository } from '@/infra/db/prisma/repositories/prisma-wallet.repository';

let sut: CreateWalletUseCase;

beforeEach(() => {
  sut = new CreateWalletUseCase(
    new PrismaWalletRepository(new PrismaService()),
    new PrismaWalletAddressRepository(new PrismaService()),
    new WalletCripto(),
  );
});

describe('CreateWalletUseCase', () => {
  it('should create a wallet', async () => {
    const result = await sut.execute();

    expect(result.wallet).toBeInstanceOf(Wallet);
    expect(result.seed).toBeDefined();
  });
});
