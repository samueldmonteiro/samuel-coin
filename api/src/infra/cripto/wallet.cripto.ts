import * as bip39 from 'bip39';
import * as crypto from 'crypto';
import {
  GenerateWalletResponse,
  WalletCriptoService,
} from '@/domain/services/wallet-cripto.service';
import { Injectable } from '@nestjs/common';
import { GenerateWalletError } from '@/domain/errors/generate-wallet.error';

@Injectable()
export class WalletCripto implements WalletCriptoService {
  async generateWallet(): Promise<GenerateWalletResponse> {
    try {
      const { HDKey } = await import('@scure/bip32');

      const mnemonic = bip39.generateMnemonic(128); // 128 bits = 12 palavras

      const seed = bip39.mnemonicToSeedSync(mnemonic);

      const hdkey = HDKey.fromMasterSeed(seed);
      const derived = hdkey.derive("m/44'/0'/0'/0/0");
      if (!derived.privateKey || !derived.publicKey) {
        throw new GenerateWalletError('Failed to generate private/public key pair');
      }

      const identifier = this.generateIdentifier(derived.publicKey);

      return {
        mnemonic,
        identifier,
        publicKey: Buffer.from(derived.publicKey).toString('hex'),
      };
    } catch (error: any) {
      throw new GenerateWalletError(error.message);
    }
  }

  private generateIdentifier(publicKey: Uint8Array): string {
    const publicKeyBuffer = Buffer.from(publicKey);

    return crypto
      .createHash('sha256')
      .update(publicKeyBuffer)
      .digest('hex')
      .substring(0, 40);
  }
}
