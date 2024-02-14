import type { CategoriesSearchParams } from '~/types';

import { CategoryFilters } from '../_components/category-filters';

export type CategoryPageProps = {
  params: {
    categorySlug: string;
  };
  searchParams: CategoriesSearchParams;
};

export default function CategoryPage({ searchParams, params: { categorySlug } }: CategoryPageProps) {
  return (
    <div className='container pb-8 pt-6 md:py-8'>
      <div className='mb-8 space-y-1'>
        <div className='flex flex-col gap-6 lg:flex-row lg:gap-10'>
          <CategoryFilters category={categorySlug} searchParams={searchParams} />
          <div className='flex-1'>
            <div className='mb-6 space-y-1'>
              <h1 className='text-center text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]'>
                Custom Apparel
              </h1>
              <p className='text-center text-base text-muted-foreground sm:text-lg'>
                Personalize apparel with free & fast shipping
              </p>
            </div>
            content
          </div>
        </div>
      </div>
    </div>
  );
}
