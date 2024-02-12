'use server';

import { db } from '~/db';

export async function getStores() {
  return db.query.stores.findMany({
    columns: {
      logo: true,
      slug: true,
    },
  });
}

export type Stores = Awaited<ReturnType<typeof getStores>>;
