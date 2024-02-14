'use server';

import { db } from '~/db';

export async function getColors() {
  return db.query.colors.findMany({
    columns: {
      slug: true,
      title: true,
      code: true,
    },
  });
}

export type Colors = Awaited<ReturnType<typeof getColors>>;
