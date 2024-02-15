'use server';

import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';

import { colors, productStocks, sizes } from '~/db/schema';

export async function getProductStock(colorSlug?: string) {
  if (!colorSlug) return [];
  const color = await db.query.colors.findFirst({
    where: and(and(eq(colors.slug, colorSlug), isNull(colors.deletedAt))),
    columns: {
      id: true,
    },
  });
  if (!color) return [];
  return await db
    .select({
      id: productStocks.id,
      quantity: productStocks.quantity,
      price: productStocks.price,
      size: {
        title: sizes.title,
      },
    })
    .from(productStocks)
    .innerJoin(sizes, and(eq(productStocks.sizeId, sizes.id), isNull(sizes.deletedAt)))
    .where(and(eq(productStocks.colorId, color.id), isNull(productStocks.deletedAt)));
}

export type ProductStocks = Awaited<ReturnType<typeof getProductStock>>;
