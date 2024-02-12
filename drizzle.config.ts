import type { Config } from 'drizzle-kit';

import { env } from '~/env';

export default {
  schema: './src/db/schema.ts',
  driver: 'mysql2',
  out: './drizzle',
  dbCredentials: {
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    host: env.DATABASE_HOST,
    port: Number(env.DATABASE_PORT),
    database: env.DATABASE_NAME,
  },
} satisfies Config;
