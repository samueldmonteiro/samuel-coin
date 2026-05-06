import { WalletAddress } from './wallet-address.entity';

describe('WalletAddress', () => {
  it('should create a wallet address', () => {
    const walletAddress = new WalletAddress({
      id: 'id',
      address: 'address',
      createdAt: new Date(),
    });

    expect(walletAddress).toBeInstanceOf(WalletAddress);
  });

  it('should throw an error when address is empty', () => {
    expect(() => {
      new WalletAddress({
        id: 'id',
        address: '',
        createdAt: new Date(),
      });
    }).toThrowError('Address is required');
  });
});
