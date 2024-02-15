import { unstable_cache } from 'next/cache';

import { getProduct } from '~/lib/fetchers/products';
import { formatPrice } from '~/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import { Separator } from '~/components/ui/separator';
import { Rating } from '~/components/rating';

const getCachedData = unstable_cache(
  async (slug: string) => {
    const productPromise = getProduct(slug);
    return Promise.all([productPromise]);
  },
  [],
  {
    revalidate: 1, // 1 minute
  }
);

export default async function ProductPage() {
  const [product] = await getCachedData('productSlug' as string);

  return (
    <div className='container grid items-center gap-8 pb-8 pt-6 md:py-8'>
      <div className='flex flex-col gap-8 md:flex-row md:gap-16'>
        <div className='flex flex-col gap-8 md:flex-row md:gap-16'>
          {/* <ProductImageCarousel
          className='w-full md:w-1/2'
          images={productImages}
          title={product?.title ?? ''}
          options={{
            loop: true,
          }}
        /> */}
          <Separator className='mt-4 md:hidden' />
          <div className='flex w-full flex-col gap-4 md:w-1/2'>
            <div className='space-y-2'>
              <h2 className='line-clamp-1 text-2xl font-bold'>{product?.title}</h2>
              <div>SKU: {product?.sku}</div>
              <div className='flex items-center space-x-2'>
                {/* <Rating rating={rating._avg.rating} />
              <span>({rating._count.rating})</span> */}
              </div>
              <div className='text-xl font-semibold text-primary'>
                {product?.discount && product.discount > 0 ? (
                  <div className='space-x-2'>
                    <span className='line-through'>{formatPrice(product.sellPrice ?? 0)}</span>
                    <span>{formatPrice((product.sellPrice ?? 0) - product.discount)}</span>
                  </div>
                ) : (
                  formatPrice(product?.sellPrice ?? 0)
                )}
              </div>
            </div>
            <Separator className='my-1.5' />
            {/* <AddToCartForm slug={slug} product={product} isAuthed={!!session} storeProduct={!!product.store} /> */}
            <Separator className='mt-5' />
            <Accordion type='single' collapsible className='w-full' defaultValue='description'>
              <AccordionItem value='description'>
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <div
                    className='prose'
                    dangerouslySetInnerHTML={{
                      __html: product?.description ?? 'No description is available for this product.',
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}
