import Link from 'next/link';
import type { CategoriesSearchParams } from '~/types';

import { buttonVariants } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Icons } from '~/components/icons';

import { getSearchParams } from './category-filters';

type CategoryProductsProps = {
  category: string;
  searchParams: CategoriesSearchParams;
};

export function CategoryProducts({ category, searchParams }: CategoryProductsProps) {
  const { page } = searchParams;
  const currentPage = Number(page ?? 1);

  return (
    <>
      <div className='mb-4 flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
        <div>
          Showing <span className='font-semibold'>{(currentPage - 1) * 12}</span> to{' '}
          {/* <span className='font-semibold'>{Math.min(currentPage * 12, productsCount ?? 0)}</span> of{' '}
            <span className='font-semibold'>{productsCount ?? 0}</span> */}
        </div>
        <div className='flex items-center space-x-3'>
          <div className='flex items-center space-x-1'>
            <Icons.caretSort className='size-4' />
            <span>Sort:</span>
          </div>
          <Select defaultValue={searchParams.sort ?? 'priceasc'}>
            <SelectTrigger className='w-56'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='priceasc'>Lowest to Highest Price</SelectItem>
              <SelectItem value='pricedesc'>Highest to Lowest Price</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-x-2 gap-y-4 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-2 xl:grid-cols-3'>
        {/* {products.map(product => (
            <ProductCard key={product.slug} product={product} />
          ))} */}
      </div>
      {/* {productsCount === 0 && <div className='text-center'>No Products Found</div>} */}
      <div className='mt-4 flex justify-end space-x-2'>
        <Link
          className={buttonVariants()}
          href={getSearchParams(searchParams, {
            page: String(currentPage - 1),
          })}
        >
          <Icons.chevronLeft className='mr-2 size-4' /> Previous
        </Link>
        <Link
          className={buttonVariants()}
          href={getSearchParams(searchParams, {
            page: String(currentPage + 1),
          })}
        >
          Next <Icons.chevronRight className='ml-2 size-4' />
        </Link>
      </div>
    </>
  );
}
