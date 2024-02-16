'use server';

import { db } from '~/db';
import type { BrandsFilters, CategoriesFilters } from '~/types';
import { and, count, eq, gt, inArray, isNull, lt } from 'drizzle-orm';
import { arrayToTree } from 'performant-array-to-tree';

import { categories, colors, productCategories, products, productStocks, sizes, stores } from '~/db/schema';

export async function getCategories() {
  return db.query.categories.findMany({
    where: and(
      eq(categories.type, 'product'),
      isNull(categories.parentId),
      isNull(categories.deletedAt),
      eq(categories.status, 'active')
    ),
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

export async function getFilteredCategories(filter?: CategoriesFilters) {
  const colorsIdsPromise = filter?.colors
    ? db.query.colors
        .findMany({
          where: and(inArray(colors.slug, filter.colors), isNull(colors.deletedAt)),
          columns: {
            id: true,
          },
        })
        .then(colors => colors.map(color => color.id))
    : undefined;
  const sizesIdsPromise = filter?.sizes
    ? db.query.sizes
        .findMany({
          where: and(inArray(sizes.slug, filter.sizes), isNull(sizes.deletedAt)),
          columns: {
            id: true,
          },
        })
        .then(sizes => sizes.map(size => size.id))
    : undefined;
  const [colorsIds, sizesIds] = await Promise.all([colorsIdsPromise, sizesIdsPromise]);
  const productsIds = await db
    .select({
      id: products.id,
    })
    .from(products)
    .innerJoin(
      productStocks,
      and(
        eq(products.id, productStocks.productId),
        filter?.maxPrice ? lt(products.sellPrice, filter.maxPrice) : undefined,
        filter?.minPrice ? gt(products.sellPrice, filter.minPrice) : undefined,
        sizesIds && inArray(productStocks.sizeId, sizesIds),
        colorsIds && inArray(productStocks.colorId, colorsIds),
        eq(products.status, 'active'),
        isNull(products.deletedAt)
      )
    )
    .groupBy(products.id)
    .then(products => products.map(product => product.id));
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

export async function getFilteredBrandCategories(filter?: BrandsFilters) {
  const brandPromise = filter?.brand
    ? db.query.stores.findFirst({
        where: and(eq(stores.slug, filter.brand), isNull(stores.deletedAt), eq(stores.status, 'active')),
        columns: {
          id: true,
        },
      })
    : undefined;
  const colorsIdsPromise = filter?.colors
    ? db.query.colors
        .findMany({
          where: and(inArray(colors.slug, filter.colors), isNull(colors.deletedAt)),
          columns: {
            id: true,
          },
        })
        .then(colors => colors.map(color => color.id))
    : undefined;
  const sizesIdsPromise = filter?.sizes
    ? db.query.sizes
        .findMany({
          where: and(inArray(sizes.slug, filter.sizes), isNull(sizes.deletedAt)),
          columns: {
            id: true,
          },
        })
        .then(sizes => sizes.map(size => size.id))
    : undefined;
  const [brand, colorsIds, sizesIds] = await Promise.all([brandPromise, colorsIdsPromise, sizesIdsPromise]);
  const productsIds = await db
    .select({
      id: products.id,
    })
    .from(products)
    .innerJoin(
      productStocks,
      and(
        eq(products.id, productStocks.productId),
        filter?.maxPrice ? lt(products.sellPrice, filter.maxPrice) : undefined,
        filter?.minPrice ? gt(products.sellPrice, filter.minPrice) : undefined,
        sizesIds && inArray(productStocks.sizeId, sizesIds),
        colorsIds && inArray(productStocks.colorId, colorsIds),
        brand && eq(products.storeId, brand.id),
        eq(products.status, 'active'),
        isNull(products.deletedAt)
      )
    )
    .groupBy(products.id)
    .then(products => products.map(product => product.id));
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
        productsIds && inArray(productCategories.productId, productsIds),
        eq(categories.type, 'product'),
        isNull(categories.parentId),
        isNull(categories.deletedAt),
        eq(categories.status, 'active')
      )
    )
    .groupBy(categories.id, categories.slug, categories.title, categories.parentId);
  const nestedCategories = arrayToTree(filteredCategories, {
    dataField: null,
  }) as FilteredCategory[];
  return nestedCategories;
}
