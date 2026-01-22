import { PrismaClient } from '@/generated/prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = `${process.env.DATABASE_URL as string}`;

    const databaseURL = new URL(connectionString);
    const schema = databaseURL.searchParams.get('schema') ?? 'public';

    const adapter = new PrismaPg(
      {
        connectionString: process.env.DATABASE_URL as string,
      },
      { schema },
    );
    super({ adapter, log: ['query'] });
  }
}
