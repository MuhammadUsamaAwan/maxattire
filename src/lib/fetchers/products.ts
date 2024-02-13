'use server';

import { db } from '~/db';

export async function getNewProducts() {
  return db.query.products.findMany({
    columns: {
      title: true,
      slug: true,
      thumbnail: true,
      unitPrice: true,
      purchasePrice: true,
      sellPrice: true,
      discount: true,
    },
    limit: 8,
  });
}

export type Products = Awaited<ReturnType<typeof getNewProducts>>;
