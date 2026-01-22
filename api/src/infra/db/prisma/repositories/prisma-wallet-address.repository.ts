import { WalletAddressRepository } from '@/domain/repositories/wallet-address.repository';
import { PrismaService } from '../prisma.service';
import { WalletAddress } from '@/domain/entities/wallet-address.entity';
import { WalletAddressMapper } from '../mappers/wallet-address.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaWalletAddressRepository implements WalletAddressRepository {
  constructor(private prisma: PrismaService) {}

  async create(walletAddress: WalletAddress): Promise<WalletAddress> {
    const prismaWalletAddressCreate =
      WalletAddressMapper.toPrismaCreate(walletAddress);

    const prismaWalletAddress = await this.prisma.walletAddress.create({
      data: prismaWalletAddressCreate,
    });

    return WalletAddressMapper.toDomain(prismaWalletAddress);
  }

  async findById(id: string): Promise<WalletAddress | null> {
    const prismaWalletAddress = await this.prisma.walletAddress.findUnique({
      where: { id },
    });

    if (!prismaWalletAddress) {
      return null;
    }

    return WalletAddressMapper.toDomain(prismaWalletAddress);
  }

  async findByAddress(address: string): Promise<WalletAddress | null> {
    const prismaWalletAddress = await this.prisma.walletAddress.findUnique({
      where: { address },
    });

    if (!prismaWalletAddress) {
      return null;
    }

    return WalletAddressMapper.toDomain(prismaWalletAddress);
  }

  async findAll(): Promise<WalletAddress[]> {
    const prismaWalletAddresses = await this.prisma.walletAddress.findMany();

    return WalletAddressMapper.toDomainMany(prismaWalletAddresses);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.walletAddress.delete({
      where: { id },
    });
  }

  async update(walletAddress: WalletAddress): Promise<WalletAddress> {
    const prismaWalletAddressUpdate =
      WalletAddressMapper.toPrismaCreate(walletAddress);

    const prismaWalletAddress = await this.prisma.walletAddress.update({
      where: { id: walletAddress.id },
      data: prismaWalletAddressUpdate,
    });

    return WalletAddressMapper.toDomain(prismaWalletAddress);
  }
}
