'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { BrandsSearchParams, CategoriesSearchParams } from '~/types';

import { cn, unslugify } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';
import { buttonVariants } from '~/components/ui/button';
import { Icons } from '~/components/icons';

import { getSearchParams } from '../../app/categories/[categorySlug]/_components/category-filters';

type ActiveFiltersProps = {
  searchParams: CategoriesSearchParams | BrandsSearchParams;
};

const order = ['category', 'sizes', 'colors', 'min_price', 'max_price'];

export function ActiveFilters({ searchParams }: ActiveFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (Object.keys(searchParams).length === 0) {
    return null;
  }

  const sortedSearchParams = Object.entries(searchParams).sort(([a], [b]) => order.indexOf(a) - order.indexOf(b));

  return (
    <div className='space-y-2 rounded-lg border px-5 py-3'>
      <div className='font-semibold'>Active Filters:</div>
      {sortedSearchParams?.map(([key, value]) => (
        <div key={key} className='flex flex-wrap items-center gap-2'>
          <span className='text-sm font-medium'>{unslugify(key)}:</span>
          {value?.split(',').map((v, i) => (
            <button
              key={i}
              onClick={() => {
                let newValue: string[] | string | undefined = value.split(',').filter(e => e !== v);
                newValue.length === 0 ? (newValue = undefined) : (newValue = newValue.join(','));
                router.push(pathname + getSearchParams(searchParams, { [key]: newValue }));
              }}
            >
              <Badge variant='secondary' className='font-normal'>
                <Icons.cross className='mr-1 size-4' />
                {v}
              </Badge>
            </button>
          ))}
        </div>
      ))}
      <Link href={pathname} className={cn(buttonVariants({ variant: 'secondary' }), 'h-auto py-1.5 text-xs')}>
        Clear All
      </Link>
    </div>
  );
}
