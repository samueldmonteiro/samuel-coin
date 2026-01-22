import { DomainError } from '../errors/domain.error';
import { WalletAddress } from './wallet-address.entity';

export interface WalletProps {
  id: string;
  balance: number;
  publicKey: string;
  createdAt: Date;
  updatedAt: Date;
  identifier: string;
  addresses?: WalletAddress[];
}

export class Wallet {
  private props: WalletProps;

  constructor(props: WalletProps) {
    if (!props.addresses) {
      props.addresses = [];
    }
    this.validateConstraints(props);
    this.props = props;
  }

  private validateConstraints(props: WalletProps) {
    if (props.balance < 0) {
      throw new DomainError('Balance must be greater than 0');
    }

    if (!props.identifier) {
      throw new DomainError('Identifier is required');
    }
  }

  get id() {
    return this.props.id;
  }

  get addresses(): WalletAddress[] | undefined {
    return this.props.addresses;
  }

  get balance() {
    return this.props.balance;
  }

  get publicKey() {
    return this.props.publicKey;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get identifier() {
    return this.props.identifier;
  }

  addAddress(address: WalletAddress) {
    this.props.addresses?.push(address);
  }

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      balance: this.balance,
      publicKey: this.publicKey,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      identifier: this.identifier,
      ...(this.addresses && {
        addresses: this.addresses.map((p: WalletAddress) => p.toJSON()),
      }),
    };
  }
}
