'use server';

import { db } from '~/db';
import type { ActiveFilters } from '~/types';
import { and, countDistinct, eq, gt, inArray, lt } from 'drizzle-orm';

import { categories, colors, productCategories, products, productStocks, sizes } from '~/db/schema';

export async function getColors() {
  return db.query.colors.findMany({
    columns: {
      slug: true,
      title: true,
      code: true,
    },
  });
}

export async function getFilteredColors(filter?: ActiveFilters) {
  const sizesIdsPromise = filter?.sizes
    ? db.query.sizes
        .findMany({
          where: inArray(sizes.slug, filter.sizes),
          columns: {
            id: true,
          },
        })
        .then(sizes => sizes.map(size => size.id))
    : undefined;
  const categoryPromise = filter?.category
    ? db.query.categories.findFirst({
        where: eq(categories.slug, filter.category),
        columns: {
          id: true,
        },
      })
    : undefined;
  const [sizesIds, category] = await Promise.all([sizesIdsPromise, categoryPromise]);
  const productsIds = await db
    .select({
      id: products.id,
    })
    .from(products)
    .innerJoin(productCategories, eq(products.id, productCategories.productId))
    .where(
      and(
        filter?.maxPrice ? lt(products.sellPrice, filter.maxPrice) : undefined,
        filter?.minPrice ? gt(products.sellPrice, filter.minPrice) : undefined,
        category && eq(productCategories.categoryId, category.id)
      )
    )
    .groupBy(products.id)
    .then(products => products.map(product => product.id));
  const filteredColors = await db
    .select({
      slug: colors.slug,
      title: colors.title,
      code: colors.code,
      productCount: countDistinct(productStocks.productId),
    })
    .from(colors)
    .innerJoin(
      productStocks,
      and(
        eq(colors.id, productStocks.colorId),
        sizesIds && inArray(productStocks.sizeId, sizesIds),
        productsIds && inArray(productStocks.productId, productsIds)
      )
    )
    .groupBy(colors.id, colors.slug, colors.title, colors.code);
  return filteredColors;
}