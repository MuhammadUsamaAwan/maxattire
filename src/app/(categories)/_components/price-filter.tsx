'use client';

import * as React from 'react';
import Link from 'next/link';
import type { CategoriesSearchParams } from '~/types';

import { buttonVariants } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

import { getSearchParams } from './category-filters';

type PriceFilterProps = {
  searchParams: CategoriesSearchParams;
};

export function PriceFilter({ searchParams }: PriceFilterProps) {
  const [maxPrice, setMaxPrice] = React.useState(searchParams.max_price);
  const [minPrice, setMinPrice] = React.useState(searchParams.min_price);

  return (
    <>
      <Input
        id='min-price'
        type='number'
        inputMode='numeric'
        placeholder='Min'
        min={0}
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
      />
      <label className='sr-only' htmlFor='"min-price'>
        Min Price
      </label>
      <span>-</span>
      <Input
        id='max-price'
        type='number'
        inputMode='numeric'
        placeholder='Max'
        min={0}
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
      />
      <label className='sr-only' htmlFor='max-price'>
        Max Price
      </label>
      <Link
        href={getSearchParams(searchParams, {
          min_price: minPrice,
          max_price: maxPrice,
        })}
        className={buttonVariants()}
      >
        Apply
      </Link>
    </>
  );
}
