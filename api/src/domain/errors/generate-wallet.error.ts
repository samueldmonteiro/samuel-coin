export class GenerateWalletError extends Error {
  constructor(message = 'Error generating wallet') {
    super(message);
    this.name = 'GenerateWalletError';
  }
}
