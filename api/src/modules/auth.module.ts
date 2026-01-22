import { Module } from '@nestjs/common';
import { WalletController } from '../infra/http/controllers/waller.controller';
import { WalletRepository } from '@/domain/repositories/wallet.repository';
import { PrismaWalletRepository } from '../infra/db/prisma/repositories/prisma-wallet.repository';
import { CreateWalletUseCase } from '@/application/use-cases/wallet/create-wallet.use-case';
import { WalletCriptoService } from '@/domain/services/wallet-cripto.service';
import { WalletAddressRepository } from '@/domain/repositories/wallet-address.repository';
import { WalletCripto } from '../infra/cripto/wallet.cripto';
import { PrismaWalletAddressRepository } from '../infra/db/prisma/repositories/prisma-wallet-address.repository';
import { PrismaService } from '../infra/db/prisma/prisma.service';

@Module({
  controllers: [WalletController],
  providers: [
    PrismaService,
    {
      provide: WalletRepository,
      useClass: PrismaWalletRepository,
    },
    {
      provide: WalletAddressRepository,
      useClass: PrismaWalletAddressRepository,
    },
    {
      provide: WalletCriptoService,
      useClass: WalletCripto,
    },
    {
      provide: CreateWalletUseCase,
      useFactory: (
        walletRepository: WalletRepository,
        walletAddressRepository: WalletAddressRepository,
        walletCriptoService: WalletCriptoService,
      ) => {
        return new CreateWalletUseCase(
          walletRepository,
          walletAddressRepository,
          walletCriptoService,
        );
      },
      inject: [WalletRepository, WalletAddressRepository, WalletCriptoService],
    },
  ],
  exports: [CreateWalletUseCase],
})
export class AuthModule {}
