'use server';

import { db } from '~/db';
import { and, eq, isNull } from 'drizzle-orm';

import { colors, productStockImages, productStocks } from '~/db/schema';

export async function getProductStockImages(colorSlug?: string) {
  if (!colorSlug) return db.select({ fileName: productStockImages.fileName }).from(productStockImages);
  const color = await db.query.colors.findFirst({
    where: and(and(eq(colors.slug, colorSlug), isNull(colors.deletedAt))),
    columns: {
      id: true,
    },
  });
  if (!color) return db.select({ fileName: productStockImages.fileName }).from(productStockImages);
  return db
    .select({
      fileName: productStockImages.fileName,
    })
    .from(productStockImages)
    .leftJoin(
      productStocks,
      and(
        eq(productStockImages.productStockId, productStocks.id),
        eq(productStocks.colorId, color.id),
        isNull(productStocks.deletedAt)
      )
    );
}
