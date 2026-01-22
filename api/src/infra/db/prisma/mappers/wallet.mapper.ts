import { Wallet, WalletProps } from '@/domain/entities/wallet.entity';
import {
  Wallet as PrismaWallet,
  WalletAddress as PrismaWalletAddress,
} from '@/generated/prisma/client';
import { Decimal } from '@prisma/client/runtime/client';
import { WalletAddressMapper } from './wallet-address.mapper';

export type PrismaWalletWithRelations = PrismaWallet & {
  walletAddresses?: PrismaWalletAddress[];
};

export class WalletMapper {
  static toDomain(prismaWallet: PrismaWalletWithRelations): Wallet {
    const walletProps: WalletProps = {
      id: prismaWallet.id,
      identifier: prismaWallet.identifier,
      balance: prismaWallet.balance.toNumber(),
      publicKey: prismaWallet.publicKey,
      createdAt: prismaWallet.createdAt,
      updatedAt: prismaWallet.updatedAt,
      addresses: prismaWallet.walletAddresses?.map((address) =>
        WalletAddressMapper.toDomain(address),
      ),
    };
    return new Wallet(walletProps);
  }

  static toDomainMany(prismaWallets: PrismaWalletWithRelations[]): Wallet[] {
    return prismaWallets.map((wallet) => this.toDomain(wallet));
  }

  static toPrismaCreate(
    wallet: Wallet,
  ): Omit<PrismaWallet, 'createdAt' | 'updatedAt'> {
    return {
      id: wallet.id,
      balance: new Decimal(wallet.balance),
      publicKey: wallet.publicKey,
      identifier: wallet.identifier,
    };
  }
}
