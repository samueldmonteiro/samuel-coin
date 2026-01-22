import 'dotenv/config';

import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { randomUUID } from 'node:crypto';
import { execSync } from 'node:child_process';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const newSchema = randomUUID();

const connectionString = `${process.env.DATABASE_URL}`;

const databaseURL = new URL(connectionString);
databaseURL.searchParams.set('schema', newSchema);
process.env.DATABASE_URL = databaseURL.toString();

const adapter = new PrismaPg(
  {
    connectionString: process.env.DATABASE_URL,
  },
  { schema: newSchema },
);

const prisma = new PrismaClient({ adapter });

beforeAll(() => {
  execSync('npx prisma migrate deploy');
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(
    `DROP SCHEMA IF EXISTS "${newSchema}" CASCADE`,
  );
  await prisma.$disconnect();
});
