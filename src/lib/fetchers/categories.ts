'use server';

import { db } from '~/db';
import type { ActiveFilters } from '~/types';
import { and, count, eq, gt, inArray, isNull, lt } from 'drizzle-orm';
import { arrayToTree } from 'performant-array-to-tree';

import { categories, colors, productCategories, products, productStocks, sizes } from '~/db/schema';

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
    },
  });
}

export type Categories = Awaited<ReturnType<typeof getCategories>>;

export type FilteredCategory = {
  title: string;
  slug: string;
  productCount: number;
  children: {
    title: string;
    slug: string;
    productCount: number;
  }[];
};

export async function getFilteredCategories(filter?: ActiveFilters) {
  const colorsIdsPromise = filter?.colors
    ? db.query.colors
        .findMany({
          where: inArray(colors.slug, filter.colors),
          columns: {
            id: true,
          },
        })
        .then(colors => colors.map(color => color.id))
    : undefined;
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
  const [colorsIds, sizesIds] = await Promise.all([colorsIdsPromise, sizesIdsPromise]);
  const shouldProductFilter = filter?.minPrice || filter?.maxPrice || sizesIds || colorsIds;
  const productsIds = shouldProductFilter
    ? await db
        .select({
          id: products.id,
        })
        .from(products)
        .innerJoin(productStocks, eq(products.id, productStocks.productId))
        .where(
          and(
            filter?.maxPrice ? lt(products.sellPrice, filter.maxPrice) : undefined,
            filter?.minPrice ? gt(products.sellPrice, filter.minPrice) : undefined,
            sizesIds && inArray(productStocks.sizeId, sizesIds),
            colorsIds && inArray(productStocks.colorId, colorsIds)
          )
        )
        .groupBy(products.id)
        .then(products => products.map(product => product.id))
    : undefined;
  const filteredCategories = await db
    .select({
      id: categories.id,
      slug: categories.slug,
      title: categories.title,
      productCount: count(productCategories.productId),
      parentId: categories.parentId,
    })
    .from(categories)
    .innerJoin(
      productCategories,
      and(
        eq(categories.id, productCategories.categoryId),
        productsIds && inArray(productCategories.productId, productsIds)
      )
    )
    .groupBy(categories.id, categories.slug, categories.title, categories.parentId);
  const nestedCategories = arrayToTree(filteredCategories, {
    dataField: null,
  }) as FilteredCategory[];
  return nestedCategories;
}
