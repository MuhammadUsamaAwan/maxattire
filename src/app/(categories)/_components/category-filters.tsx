import { unstable_cache } from 'next/cache';
import Link from 'next/link';
import type { ActiveFilters, CategoriesSearchParams } from '~/types';
import { isUndefined, omitBy } from 'lodash';

import { getFilteredCategories } from '~/lib/fetchers/categories';
import { getFilteredColors } from '~/lib/fetchers/colors';
import { getFilteredSizes } from '~/lib/fetchers/sizes';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Badge } from '~/components/ui/badge';
import { Checkbox } from '~/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

import { PriceFilter } from './price-filter';

const getCachedData = unstable_cache(
  async (category: string, searchParams: CategoriesSearchParams) => {
    const filters = omitBy(
      {
        colors: searchParams.colors?.split(','),
        sizes: searchParams.sizes?.split(','),
        category,
        minPrice: searchParams.min_price ? Number(searchParams.min_price) : undefined,
        maxPrice: searchParams.max_price ? Number(searchParams.max_price) : undefined,
      },
      isUndefined
    ) as ActiveFilters;
    const categoriesPromise = getFilteredCategories(filters);
    const sizesPromise = getFilteredSizes(filters);
    const colorsPromise = getFilteredColors(filters);
    return Promise.all([categoriesPromise, sizesPromise, colorsPromise]);
  },
  [],
  {
    revalidate: 60, // 1 minute
  }
);

type CategoryFiltersProps = {
  category: string;
  searchParams: CategoriesSearchParams;
};

export function getSearchParams(
  searchParams: CategoriesSearchParams,
  partialSearchParams: Partial<CategoriesSearchParams>
) {
  const newSearchParams = new URLSearchParams(
    omitBy(
      {
        ...searchParams,
        ...partialSearchParams,
      },
      isUndefined
    ) as Record<string, string>
  );
  return `?${newSearchParams.toString()}`;
}

export async function CategoryFilters({ category, searchParams }: CategoryFiltersProps) {
  const [categories, sizes, colors] = await getCachedData(category, searchParams);
  const selectedSizes = searchParams.sizes?.split(',') ?? [];
  const selectedColors = searchParams.colors?.split(',') ?? [];

  return (
    <Accordion type='multiple'>
      <AccordionItem key='categories' value='categories'>
        <AccordionTrigger>Categories</AccordionTrigger>
        <AccordionContent className='flex flex-col space-y-2 p-4 pt-0'>
          <Accordion type='multiple' className='w-full'>
            {categories?.map(category => (
              <AccordionItem key={category.slug} value={category.slug}>
                <AccordionTrigger>
                  <Link href={category.slug} className='hover:text-primary'>
                    {category.title}
                    <Badge variant='outline' className='ml-2 font-normal'>
                      {category.productCount}
                    </Badge>
                  </Link>
                </AccordionTrigger>
                <AccordionContent className='flex flex-col space-y-2'>
                  {category.children?.map(child => (
                    <Link key={child.slug} href={child.slug} className='hover:text-primary'>
                      {child.title}
                      <Badge variant='outline' className='ml-2 font-normal'>
                        {child.productCount}
                      </Badge>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='sizes'>
        <AccordionTrigger>Sizes</AccordionTrigger>
        <AccordionContent className='space-y-2'>
          {sizes.map(size => (
            <div key={size.slug} className='flex items-center space-x-2'>
              <Link
                href={
                  selectedSizes.includes(size.slug)
                    ? getSearchParams(searchParams, {
                        sizes:
                          selectedSizes.filter(s => s !== size.slug).length > 0
                            ? selectedSizes.filter(s => s !== size.slug).join(',')
                            : undefined,
                      })
                    : getSearchParams(searchParams, { sizes: [...selectedSizes, size.slug].join(',') })
                }
                className='flex items-center space-x-2'
              >
                <Checkbox id={size.slug} checked={selectedSizes.includes(size.slug)} />
                <label htmlFor={size.slug}>{size.slug}</label>
              </Link>
              <Badge variant='outline' className='ml-2 font-normal'>
                {size.productCount}
              </Badge>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='colors'>
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent className='grid gap-2 [grid-template-columns:repeat(auto-fit,minmax(6rem,6rem))]'>
          {colors.map(color => (
            <Tooltip key={color?.code}>
              <TooltipTrigger asChild>
                <div className='flex items-center'>
                  <Link
                    href={
                      selectedColors.includes(color.slug)
                        ? getSearchParams(searchParams, {
                            colors:
                              selectedColors.filter(s => s !== color.slug).length > 0
                                ? selectedColors.filter(s => s !== color.slug).join(',')
                                : undefined,
                          })
                        : getSearchParams(searchParams, { colors: [...selectedColors, color.slug].join(',') })
                    }
                    className='flex items-center space-x-2'
                  >
                    <Checkbox
                      title={color.title ?? ''}
                      key={color.slug}
                      className='size-8 rounded-full border-0'
                      style={{
                        backgroundColor: `#${color.code}` ?? '',
                      }}
                    ></Checkbox>
                  </Link>
                  <Badge variant='outline' className='ml-2 font-normal'>
                    {color.productCount}
                  </Badge>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div>{color?.title}</div>
              </TooltipContent>
            </Tooltip>
          ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value='price'>
        <AccordionTrigger>Price</AccordionTrigger>
        <AccordionContent className='flex items-center space-x-2 px-1 pt-1'>
          <PriceFilter searchParams={searchParams} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
