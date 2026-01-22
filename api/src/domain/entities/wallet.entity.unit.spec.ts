import { Wallet } from './wallet.entity';

describe('Wallet', () => {
  it('should create a wallet', () => {
    const wallet = new Wallet({
      id: 'id',
      balance: 0,
      publicKey: 'publicKey',
      createdAt: new Date(),
      updatedAt: new Date(),
      identifier: 'address',
    });

    expect(wallet).toBeInstanceOf(Wallet);
  });

  it('should throw an error when balance is less than 0', () => {
    expect(() => {
      new Wallet({
        id: 'id',
        balance: -1,
        publicKey: 'publicKey',
        createdAt: new Date(),
        updatedAt: new Date(),
        identifier: 'address',
      });
    }).toThrowError('Balance must be greater than 0');
  });

  it('should throw an error when identifier is empty', () => {
    expect(() => {
      new Wallet({
        id: 'id',
        balance: 0,
        publicKey: 'publicKey',
        createdAt: new Date(),
        updatedAt: new Date(),
        identifier: '',
      });
    }).toThrowError('Identifier is required');
  });
});
