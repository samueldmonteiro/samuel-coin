import { DomainError } from './domain.error';

export class GenerateWalletError extends DomainError {

  constructor(message = 'Error generating wallet', statusCode = 400) {
    super(message, statusCode);
    this.name = 'GenerateWalletError';
  }
}