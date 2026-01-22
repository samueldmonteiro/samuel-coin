import { Wallet } from '@/domain/entities/wallet.entity';
import {
  FindWalletOptions,
  WalletRepository,
} from '@/domain/repositories/wallet.repository';
import { WalletMapper } from '../mappers/wallet.mapper';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaWalletRepository implements WalletRepository {
  constructor(private prisma: PrismaService) {}

  async create(wallet: Wallet): Promise<Wallet> {
    const prismaWalletCreate = WalletMapper.toPrismaCreate(wallet);
    const prismaWallet = await this.prisma.wallet.create({
      data: prismaWalletCreate,
    });

    return WalletMapper.toDomain(prismaWallet);
  }

  async findById(
    id: string,
    options?: FindWalletOptions,
  ): Promise<Wallet | null> {
    const prismaWallet = await this.prisma.wallet.findUnique({
      where: { id },
      include: this.buildInclude(options),
    });

    if (!prismaWallet) {
      return null;
    }

    return WalletMapper.toDomain(prismaWallet);
  }

  async findByPublicKey(publicKey: string): Promise<Wallet | null> {
    const prismaWallet = await this.prisma.wallet.findFirst({
      where: { publicKey },
    });

    if (!prismaWallet) {
      return null;
    }

    return WalletMapper.toDomain(prismaWallet);
  }

  async findAll(): Promise<Wallet[]> {
    const prismaWallets = await this.prisma.wallet.findMany();

    return WalletMapper.toDomainMany(prismaWallets);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.wallet.delete({
      where: { id },
    });
  }

  async update(wallet: Wallet): Promise<Wallet> {
    const prismaWalletUpdate = WalletMapper.toPrismaCreate(wallet);

    const prismaWallet = await this.prisma.wallet.update({
      where: { id: wallet.id },
      data: prismaWalletUpdate,
    });

    return WalletMapper.toDomain(prismaWallet);
  }

  private buildInclude(options?: FindWalletOptions) {
    if (!options?.withAddresses) {
      return null;
    }

    return {
      walletAddresses: true,
    };
  }
}
