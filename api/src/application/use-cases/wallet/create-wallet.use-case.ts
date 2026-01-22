import { WalletAddress } from '@/domain/entities/wallet-address.entity';
import { Wallet } from '@/domain/entities/wallet.entity';
import { WalletAddressRepository } from '@/domain/repositories/wallet-address.repository';
import { WalletRepository } from '@/domain/repositories/wallet.repository';
import { WalletCriptoService } from '@/domain/services/wallet-cripto.service';
import { randomUUID } from 'crypto';

export interface CreateWalletUseCaseResponse {
  wallet: Wallet;
  seed: string;
}

export class CreateWalletUseCase {
  constructor(
    private walletRepository: WalletRepository,
    private walletAddressRepository: WalletAddressRepository,
    private walletCriptoService: WalletCriptoService,
  ) {}

  async execute(): Promise<CreateWalletUseCaseResponse> {
    const walletCripto = await this.walletCriptoService.generateWallet();

    const newWallet = new Wallet({
      id: randomUUID(),
      balance: 0,
      publicKey: walletCripto.publicKey,
      createdAt: new Date(),
      updatedAt: new Date(),
      identifier: walletCripto.identifier,
    });

    const newWalletAddress = new WalletAddress({
      id: randomUUID(),
      address: walletCripto.identifier,
      createdAt: new Date(),
      wallet: newWallet,
    });

    newWallet.addAddress(newWalletAddress);

    await this.walletRepository.create(newWallet);
    await this.walletAddressRepository.create(newWalletAddress);

    const createdWallet = await this.walletRepository.findById(newWallet.id, {
      withAddresses: false,
    });

    return {
      wallet: createdWallet!,
      seed: walletCripto.mnemonic,
    };
  }
}
