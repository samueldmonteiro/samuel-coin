import { DomainError } from '../errors/domain.error';
import { Wallet } from './wallet.entity';

export interface WalletAddressProps {
  id: string;
  address: string;
  wallet?: Wallet;
  createdAt: Date;
}

export class WalletAddress {
  private props: WalletAddressProps;

  constructor(props: WalletAddressProps) {
    this.validateConstraints(props);
    this.props = props;
  }

  private validateConstraints(props: WalletAddressProps) {
    if (!props.address) {
      throw new DomainError('Address is required');
    }
  }

  get id() {
    return this.props.id;
  }

  get address() {
    return this.props.address;
  }

  get wallet(): Wallet | undefined {
    return this.props.wallet;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      address: this.address,
      createdAt: this.createdAt,
      ...(this.wallet && { wallet: this.wallet.toJSON() }),
    };
  }
}
