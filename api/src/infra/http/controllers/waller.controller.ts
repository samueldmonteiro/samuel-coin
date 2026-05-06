import { CreateWalletUseCase } from '@/application/use-cases/wallet/create-wallet.use-case';
import { Controller, HttpCode, Post } from '@nestjs/common';
import { BaseController } from './base.controller';

@Controller('wallets')
export class WalletController extends BaseController {
  constructor(private createWallet: CreateWalletUseCase) {
    super();
  }

  @Post()
  @HttpCode(201)
  async newWallet() {
    const result = await this.createWallet.execute();

    return this.created(result, 'Wallet created successfully');
  }
}
