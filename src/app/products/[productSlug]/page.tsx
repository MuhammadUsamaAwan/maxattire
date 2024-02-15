import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';

import { getProduct } from '~/lib/fetchers/products';
import { getProductStock } from '~/lib/fetchers/productStock';
import { getProductStockImages } from '~/lib/fetchers/productStockImages';
import { getProductReviews } from '~/lib/fetchers/reviews';
import { formatPrice, getAvgRating } from '~/lib/utils';
import { Separator } from '~/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Rating } from '~/components/rating';

import { AddToCart } from '../_components/add-to-cart';
import { ProductImageCarousel } from '../_components/product-image-carousel';

const getCachedData = unstable_cache(
  async (slug: string) => {
    const productPromise = getProduct(slug);
    const reviewsPromise = getProductReviews(slug);
    return Promise.all([productPromise, reviewsPromise]);
  },
  [],
  {
    revalidate: 1, // 1 minute
  }
);

const getCachedStockData = unstable_cache(
  async (colorSlug?: string) => {
    const stockPromise = getProductStock(colorSlug);
    const stockImagesPromise = getProductStockImages(colorSlug);
    return Promise.all([stockPromise, stockImagesPromise]);
  },
  [],
  {
    revalidate: 1, // 1 minute
  }
);

type ProductPageProps = {
  params: {
    productSlug: string;
  };
  searchParams: {
    color: string | undefined;
  };
};

export default async function ProductPage({ params: { productSlug }, searchParams: { color } }: ProductPageProps) {
  const [product, reviews] = await getCachedData(productSlug);
  const [stock, productImages] = await getCachedStockData(color);

  const images = productImages
    .filter(fileName => fileName !== null)
    .map(fileName => ({ src: fileName, alt: product?.title ?? '' })) as unknown as { src: string; alt: string }[];

  if (!product) {
    notFound();
  }

  return (
    <div className='container space-y-8 pb-8 pt-6 md:py-8'>
      <div className='flex flex-col gap-8 md:flex-row md:gap-16'>
        <ProductImageCarousel className='w-full md:w-1/2' images={images} title={product?.title ?? ''} />
        <Separator className='mt-4 md:hidden' />
        <div className='flex w-full flex-col gap-4 md:w-1/2'>
          <div className='space-y-2'>
            <h2 className='line-clamp-1 text-2xl font-bold'>{product?.title}</h2>
            <div>
              <span className='font-medium'>SKU:</span> {product?.sku}
            </div>
            <div className='flex items-center space-x-2'>
              <Rating rating={getAvgRating(reviews)} />
              <span>({reviews.length})</span>
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
          <AddToCart color={color} product={product} stock={stock} />
          <Separator className='mt-5' />
          <Tabs defaultValue='description'>
            <TabsList>
              <TabsTrigger value='description'>Description</TabsTrigger>
              <TabsTrigger value='sizeChart'>Size Chart</TabsTrigger>
            </TabsList>
            <TabsContent value='description'>
              <div
                className='prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0'
                dangerouslySetInnerHTML={{
                  __html: product?.description ?? 'No description is available for this product.',
                }}
              />
            </TabsContent>
            <TabsContent value='sizeChart'>Size Chart Here</TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
