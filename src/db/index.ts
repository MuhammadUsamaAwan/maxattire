import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import { env } from '~/env';
import * as schema from '~/db/schema';

const poolConnection = mysql.createPool({
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  database: env.DATABASE_NAME,
});

export const db = drizzle(poolConnection, { schema, mode: 'default' });
