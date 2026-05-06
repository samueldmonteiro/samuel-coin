import { Wallet } from '@/domain/entities/wallet.entity';
import { CreateWalletUseCase } from './create-wallet.use-case';
import { WalletAddressRepository } from '@/domain/repositories/wallet-address.repository';
import { WalletRepository } from '@/domain/repositories/wallet.repository';
import { WalletCriptoService } from '@/domain/services/wallet-cripto.service.js';
import { Mocked } from 'vitest';
import { WalletAddress } from '@/domain/entities/wallet-address.entity';

const walletRepository: Mocked<WalletRepository> = {
  create: vi.fn(),
  findById: vi.fn(),
  findByPublicKey: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
};

const walletAddressRepository: Mocked<WalletAddressRepository> = {
  create: vi.fn(),
  findById: vi.fn(),
  findByAddress: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
};

const walletCriptoService: Mocked<WalletCriptoService> = {
  generateWallet: vi.fn(),
};

let sut: CreateWalletUseCase;

beforeEach(() => {
  sut = new CreateWalletUseCase(
    walletRepository,
    walletAddressRepository,
    walletCriptoService,
  );
});

describe('CreateWalletUseCase', () => {
  it('should create a wallet', async () => {
    walletCriptoService.generateWallet.mockResolvedValue({
      publicKey: 'publicKey',
      mnemonic: 'mnemonic',
      identifier: 'address',
    });

    walletRepository.create.mockImplementation((wallet: Wallet) =>
      Promise.resolve(wallet),
    );

    walletAddressRepository.create.mockImplementation(
      (walletAddress: WalletAddress) => Promise.resolve(walletAddress),
    );

    walletRepository.findById.mockResolvedValue(
      new Wallet({
        id: 'id',
        balance: 0,
        publicKey: 'publicKey',
        createdAt: new Date(),
        updatedAt: new Date(),
        identifier: 'address',
      }),
    );

    const result = await sut.execute();
    expect(result.wallet.balance).toBe(0);
    expect(result.wallet.publicKey).toBe('publicKey');
    expect(result.wallet.createdAt).toBeInstanceOf(Date);
    expect(result.wallet.updatedAt).toBeInstanceOf(Date);
  });
});
