import { drizzle, type MySql2Database } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

import { env } from '~/env';
import * as schema from '~/db/schema';

declare global {
  // eslint-disable-next-line no-var
  var db: MySql2Database<typeof schema> | undefined;
}

let db: MySql2Database<typeof schema>;

if (env.NODE_ENV === 'production') {
  db = drizzle(
    mysql.createPool({
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      host: env.DATABASE_HOST,
      port: Number(env.DATABASE_PORT),
      database: env.DATABASE_NAME,
    }),
    { schema, mode: 'default' }
  );
} else {
  if (!global.db)
    global.db = drizzle(
      mysql.createPool({
        user: env.DATABASE_USER,
        password: env.DATABASE_PASSWORD,
        host: env.DATABASE_HOST,
        port: Number(env.DATABASE_PORT),
        database: env.DATABASE_NAME,
      }),
      { schema, mode: 'default' }
    );
  db = global.db;
}

export { db };
