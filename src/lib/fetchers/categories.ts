'use server';

import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';

import { categories } from '~/db/schema';

export async function getCategories() {
  return db.query.categories.findMany({
    where: and(eq(categories.type, 'product'), isNull(categories.parentId)),
    columns: {
      title: true,
      slug: true,
    },
    with: {
      children: {
        columns: {
          title: true,
          slug: true,
        },
      },
      storeCategories: {
        columns: {},
        with: {
          store: {
            columns: {
              slug: true,
              logo: true,
            },
          },
        },
      },
    },
  });
}

export type Categories = Awaited<ReturnType<typeof getCategories>>;
