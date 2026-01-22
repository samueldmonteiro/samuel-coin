import { Wallet } from '../entities/wallet.entity';

export interface FindWalletOptions {
  withAddresses?: boolean;
}

export abstract class WalletRepository {
  abstract create(wallet: Wallet): Promise<Wallet>;
  abstract findById(
    id: string,
    options?: FindWalletOptions,
  ): Promise<Wallet | null>;
  abstract findByPublicKey(publicKey: string): Promise<Wallet | null>;
  abstract findAll(): Promise<Wallet[]>;
  abstract delete(id: string): Promise<void>;
  abstract update(wallet: Wallet): Promise<Wallet>;
}
