import * as bip39 from 'bip39';
import * as crypto from 'crypto';
import {
  GenerateWalletResponse,
  WalletCriptoService,
} from '@/domain/services/wallet-cripto.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletCripto implements WalletCriptoService {
  async generateWallet(): Promise<GenerateWalletResponse> {
    const { HDKey } = await import('@scure/bip32');

    const mnemonic = bip39.generateMnemonic(128); // 128 bits = 12 palavras

    const seed = bip39.mnemonicToSeedSync(mnemonic);

    const hdkey = HDKey.fromMasterSeed(seed);
    const derived = hdkey.derive("m/44'/0'/0'/0/0");

    if (!derived.privateKey || !derived.publicKey) {
      throw new Error('Failed to generate private/public key pair');
    }

    const identifier = this.generateIdentifier(derived.publicKey);

    return {
      mnemonic,
      identifier,
      publicKey: Buffer.from(derived.publicKey).toString('hex'),
    };
  }

  private generateIdentifier(publicKey: Uint8Array): string {
    const publicKeyBuffer = Buffer.from(publicKey);

    return crypto
      .createHash('sha256')
      .update(publicKeyBuffer)
      .digest('hex')
      .substring(0, 40);
  }

  /** 
  async accessWallet(mnemonic: string) {
    const { HDKey } = await import('@scure/bip32');

    // Valida mnemônico
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Mnemônico inválido');
    }

    // Deriva as mesmas chaves
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdkey = HDKey.fromMasterSeed(seed);
    const derived = hdkey.derive("m/44'/0'/0'/0/0");
    const publicKey = derived.publicKey;
    const identifier = this.generateIdentifier(publicKey);

    // Busca carteira no banco usando endereço
    const wallet = await this.prisma.wallet.findUnique({
      where: { identifier },
    });

    if (!wallet) {
      throw new UnauthorizedException('Carteira não encontrada');
    }

    // Verifica se a chave pública bate
    if (wallet.publicKey !== publicKey.toString('hex')) {
      throw new UnauthorizedException('Chave pública não corresponde');
    }

    // Gera JWT token
    const token = this.jwtService.sign({
      address: wallet.address,
      sub: wallet.id,
    });

    return {
      token,
      wallet: {
        address: wallet.address,
        balance: wallet.balance,
      },
    };
  }

 **/
}
