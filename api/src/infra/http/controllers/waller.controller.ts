import { CreateWalletUseCase } from '@/application/use-cases/wallet/create-wallet.use-case';
import { Controller, HttpCode, Post } from '@nestjs/common';

@Controller('wallets')
export class WalletController {
  constructor(private createWallet: CreateWalletUseCase) {}

  @Post()
  @HttpCode(201)
  async newWallet() {
    const result = await this.createWallet.execute();

    return {
      message: 'Wallet created successfully',
      data: result,
    };
  }
}
