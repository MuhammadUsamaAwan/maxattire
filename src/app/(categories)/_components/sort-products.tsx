'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { CategoriesSearchParams } from '~/types';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';

import { getSearchParams } from '../[categorySlug]/_components/category-filters';

type SortCategoryProductsProps = {
  searchParams: CategoriesSearchParams;
};

export function SortProducts({ searchParams }: SortCategoryProductsProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Select
      defaultValue={searchParams.sort ?? 'priceasc'}
      onValueChange={val => {
        const newSearchParams = getSearchParams(searchParams, {
          sort: val,
          page: undefined,
        });
        router.push(pathname + newSearchParams);
      }}
    >
      <SelectTrigger className='w-56'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='priceasc'>Lowest to Highest Price</SelectItem>
        <SelectItem value='pricedesc'>Highest to Lowest Price</SelectItem>
      </SelectContent>
    </Select>
  );
}
