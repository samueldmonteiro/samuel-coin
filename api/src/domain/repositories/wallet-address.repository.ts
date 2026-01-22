import { WalletAddress } from '../entities/wallet-address.entity';

export abstract class WalletAddressRepository {
  abstract create(walletAddress: WalletAddress): Promise<WalletAddress>;
  abstract findById(id: string): Promise<WalletAddress | null>;
  abstract findByAddress(address: string): Promise<WalletAddress | null>;
  abstract findAll(): Promise<WalletAddress[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(walletAddress: WalletAddress): Promise<WalletAddress>;
}
