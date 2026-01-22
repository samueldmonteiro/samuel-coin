export interface GenerateWalletResponse {
  publicKey: string;
  mnemonic: string;
  identifier: string;
}

export abstract class WalletCriptoService {
  abstract generateWallet(): Promise<GenerateWalletResponse>;
}
