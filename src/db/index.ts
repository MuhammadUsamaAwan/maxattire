import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import { env } from '~/env';
import * as schema from '~/db/schema';

declare global {
  // eslint-disable-next-line no-var -- only var works here
  var db: MySql2Database<typeof schema> | undefined;
}

const poolConnection = mysql.createPool({
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  database: env.DATABASE_NAME,
});

let db: MySql2Database<typeof schema>;

if (env.NODE_ENV === 'production') {
  db = drizzle(poolConnection, { schema, mode: 'default' });
} else {
  if (!global.db) global.db = drizzle(poolConnection, { schema, mode: 'default' });

  db = global.db;
}

export { db };
