import { unstable_cache } from 'next/cache';
import Link from 'next/link';

import { getFilteredCategories } from '~/lib/fetchers/categories';
import { getFilteredColors } from '~/lib/fetchers/colors';
import { getFilteredSizes } from '~/lib/fetchers/sizes';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Checkbox } from '~/components/ui/checkbox';
import { Input } from '~/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

const getCachedData = unstable_cache(
  async () => {
    const categoriesPromise = getFilteredCategories({ colors: ['black'], category: 'men' });
    const sizesPromise = getFilteredSizes({ colors: ['black'], category: 'men' });
    const colorsPromise = getFilteredColors({ colors: ['black'], category: 'men' });
    return Promise.all([categoriesPromise, sizesPromise, colorsPromise]);
  },
  [],
  {
    revalidate: 1, // 1 minute
  }
);

export async function CategoryFilters() {
  const [categories, sizes, colors] = await getCachedData();

  return (
    <Accordion type='multiple' className='w-full lg:w-80'>
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
                    <Link key={child.slug} href={`/${category.slug}/${child.slug}`} className='hover:text-primary'>
                      {child.title}{' '}
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
              <Checkbox id={size.slug} />
              <label htmlFor={size.slug}>
                {size.slug}
                <Badge variant='outline' className='ml-2 font-normal'>
                  {size.productCount}
                </Badge>
              </label>
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
                  <Checkbox
                    title={color.title ?? ''}
                    key={color.slug}
                    className='size-8 rounded-full border-0'
                    style={{
                      backgroundColor: `#${color.code}` ?? '',
                    }}
                  ></Checkbox>
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
          <Input id='max-price' type='number' inputMode='numeric' placeholder='Min' min={0} />
          <label className='sr-only' htmlFor='"max-price'>
            Min Price
          </label>
          <span>-</span>
          <Input id='min-price' type='number' inputMode='numeric' placeholder='Max' min={0} />
          <label className='sr-only' htmlFor='min-price'>
            Max Price
          </label>
          <Button>Apply</Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
