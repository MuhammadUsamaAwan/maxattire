import type { BrandsSearchParams } from '~/types';

import { unslugify } from '~/lib/utils';

import { BrandFilters } from '../_components/brand-filters';
import { BrandProducts } from '../_components/brand-products';

export type BrandPageProps = {
  params: {
    brandSlug: string;
  };
  searchParams: BrandsSearchParams;
};

export default function BrandPage({ searchParams, params: { brandSlug } }: BrandPageProps) {
  return (
    <div className='container pb-8 pt-6 md:py-8'>
      <div className='mb-6 space-y-1'>
        <h1 className='text-center text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
          Browse {unslugify(brandSlug)}&apos;s Collection
        </h1>
        <p className='text-center text-base text-muted-foreground sm:text-lg'>
          Highest quality {unslugify(brandSlug).toLowerCase()}&apos; collection with free & fast shipping
        </p>
      </div>
      <div className='mb-8 space-y-1'>
        <div className='flex flex-col gap-6 lg:flex-row lg:gap-10'>
          <div className='w-full lg:w-80'>
            <BrandFilters brand={brandSlug} searchParams={searchParams} />
          </div>
          <div className='flex-1 sm:mt-1.5'>
            <BrandProducts brand={brandSlug} searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
