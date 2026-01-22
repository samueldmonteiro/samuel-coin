import {
  WalletAddress as PrismaWalletAddress,
  Wallet as PrismaWallet,
} from '@/generated/prisma/client';
import {
  WalletAddress,
  WalletAddressProps,
} from '@/domain/entities/wallet-address.entity';
import { WalletMapper } from './wallet.mapper';

export type PrismaWalletAddressWithRelations = PrismaWalletAddress & {
  wallet?: PrismaWallet;
};

export class WalletAddressMapper {
  static toDomain(
    prismaWalletAddress: PrismaWalletAddressWithRelations,
  ): WalletAddress {
    const walletAddressProps: WalletAddressProps = {
      id: prismaWalletAddress.id,
      address: prismaWalletAddress.address,
      wallet: prismaWalletAddress.wallet
        ? WalletMapper.toDomain(prismaWalletAddress.wallet)
        : undefined,
      createdAt: prismaWalletAddress.createdAt,
    };

    return new WalletAddress(walletAddressProps);
  }

  static toDomainMany(
    prismaWalletAddresses: PrismaWalletAddressWithRelations[],
  ): WalletAddress[] {
    return prismaWalletAddresses.map((walletAddress) =>
      this.toDomain(walletAddress),
    );
  }

  static toPrismaCreate(walletAddress: WalletAddress): PrismaWalletAddress {
    if (!walletAddress.wallet) {
      throw new Error('Wallet is required to map to Prisma schema');
    }

    return {
      id: walletAddress.id,
      address: walletAddress.address,
      walletId: walletAddress.wallet.id,
      createdAt: walletAddress.createdAt,
    };
  }
}
