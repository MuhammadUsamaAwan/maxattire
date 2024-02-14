'use server';

import { db } from '~/db';

export async function getSizes() {
  return db.query.sizes.findMany({
    columns: {
      slug: true,
      title: true,
    },
  });
}
