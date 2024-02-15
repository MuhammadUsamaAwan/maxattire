'use server';

import { db } from '~/db';

export async function getBrands() {
  return db.query.stores.findMany({
    columns: {
      logo: true,
      slug: true,
    },
  });
}

export type Brands = Awaited<ReturnType<typeof getBrands>>;
