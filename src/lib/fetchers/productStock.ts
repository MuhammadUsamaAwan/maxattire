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
      quantity: productStocks.quantity,
      price: productStocks.price,
      size: {
        id: sizes.id,
        title: sizes.title,
      },
    })
    .from(productStocks)
    .leftJoin(sizes, and(eq(productStocks.sizeId, sizes.id), isNull(sizes.deletedAt)))
    .where(and(eq(productStocks.colorId, color.id), isNull(productStocks.deletedAt)));
}

export type ProductStocks = Awaited<ReturnType<typeof getProductStock>>;
