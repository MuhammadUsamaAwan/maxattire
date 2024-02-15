import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import type { CategoriesFilters, CategoriesSearchParams } from '~/types';
import { isUndefined, omitBy } from 'lodash';

import { getFilteredProducts } from '~/lib/fetchers/products';
import { Button, buttonVariants } from '~/components/ui/button';
import { Icons } from '~/components/icons';
import { ProductCard } from '~/components/product-card';

import { SortProducts } from '../../_components/sort-products';
import { getSearchParams } from './category-filters';

const getCachedData = unstable_cache(
  async (category: string, searchParams: CategoriesSearchParams) => {
    const filters = omitBy(
      {
        colors: searchParams.colors?.split(','),
        sizes: searchParams.sizes?.split(','),
        category,
        minPrice: searchParams.min_price ? Number(searchParams.min_price) : undefined,
        maxPrice: searchParams.max_price ? Number(searchParams.max_price) : undefined,
        sort: searchParams.sort,
        page: searchParams.page ? Number(searchParams.page) : undefined,
      },
      isUndefined
    ) as CategoriesFilters;
    const productsPromise = getFilteredProducts(filters);
    return Promise.all([productsPromise]);
  },
  [],
  {
    revalidate: 1, // 1 minute
  }
);

type CategoryProductsProps = {
  category: string;
  searchParams: CategoriesSearchParams;
};

export async function CategoryProducts({ category, searchParams }: CategoryProductsProps) {
  const [{ products, productsCount }] = await getCachedData(category, searchParams);
  const { page } = searchParams;
  const currentPage = Number(page ?? 1);

  return (
    <>
      <div className='mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
        <div>
          Showing <span className='font-semibold'>{(currentPage - 1) * 12 + productsCount === 0 ? 0 : 1}</span> to{' '}
          <span className='font-semibold'>{Math.min(currentPage * 12, productsCount ?? 0)}</span> of{' '}
          <span className='font-semibold'>{productsCount ?? 0}</span>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='flex items-center space-x-1'>
            <Icons.caretSort className='size-4' />
            <span>Sort:</span>
          </div>
          <SortProducts searchParams={searchParams} />
        </div>
      </div>
      <div className='grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-2 xl:grid-cols-3'>
        {products.map(product => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
      {productsCount === 0 && <div className='text-center'>No Products Found</div>}
      <div className='mt-4 flex justify-end space-x-2'>
        {currentPage > 1 ? (
          <Link
            className={buttonVariants()}
            href={getSearchParams(searchParams, {
              page: String(currentPage - 1),
            })}
          >
            <Icons.chevronLeft className='mr-2 size-4' /> Previous
          </Link>
        ) : (
          <Button disabled>
            <Icons.chevronLeft className='mr-2 size-4' /> Previous
          </Button>
        )}
        {Math.ceil((productsCount ?? 0) / 12) > currentPage ? (
          <Link
            className={buttonVariants()}
            href={getSearchParams(searchParams, {
              page: String(currentPage + 1),
            })}
          >
            Next <Icons.chevronRight className='ml-2 size-4' />
          </Link>
        ) : (
          <Button disabled>
            Next <Icons.chevronRight className='ml-2 size-4' />
          </Button>
        )}
      </div>
    </>
  );
}
