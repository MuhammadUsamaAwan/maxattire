import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { ProductsSection } from '~/app/(landing)/_components/products-section';

import { auth } from '~/lib/actions/auth';
import { getProductColors } from '~/lib/fetchers/colors';
import { getProductStock } from '~/lib/fetchers/product-stock';
import { getProductStockImages } from '~/lib/fetchers/product-stock-images';
import { getProduct, getRelatedProducts } from '~/lib/fetchers/products';
import { getProductReviews } from '~/lib/fetchers/reviews';
import { formatPrice, getAvgRating } from '~/lib/utils';
import { Separator } from '~/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Rating } from '~/components/rating';

import { AddToCart } from '../_components/add-to-cart';
import { ProductImageCarousel } from '../_components/product-image-carousel';
import { ProductReviews } from '../_components/product-reviews';
import { SizeChart } from '../_components/size-chart';

const getCachedData = unstable_cache(
  async (slug: string) => {
    const sessionPromise = auth();
    const productPromise = getProduct(slug);
    const colorsPromise = getProductColors(slug);
    const reviewsPromise = getProductReviews(slug);
    const relatedProductsPromise = getRelatedProducts(slug);
    return Promise.all([sessionPromise, productPromise, colorsPromise, reviewsPromise, relatedProductsPromise]);
  },
  [],
  {
    revalidate: 1, // 1 minute
  }
);

const getCachedStockData = unstable_cache(
  async (productSlug: string, colorSlug?: string) => {
    const stockPromise = getProductStock(productSlug, colorSlug);
    const stockImagesPromise = getProductStockImages(productSlug, colorSlug);
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
  const [session, product, colors, reviews, relatedProducts] = await getCachedData(productSlug);
  const [stock, productImages] = await getCachedStockData(productSlug, color);

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
          <AddToCart productId={product.id} colors={colors} stock={stock} color={color} isAuthed={Boolean(session)} />
          <Separator className='mt-5' />
          <Tabs defaultValue='description'>
            <TabsList>
              <TabsTrigger value='description'>Description</TabsTrigger>
              <TabsTrigger value='sizeChart'>Size Chart</TabsTrigger>
            </TabsList>
            <TabsContent value='description'>
              <div
                className='prose max-w-full dark:prose-invert'
                dangerouslySetInnerHTML={{
                  __html: product?.description ?? 'No description is available for this product.',
                }}
              />
            </TabsContent>
            <TabsContent value='sizeChart'>
              <SizeChart slug={productSlug} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <ProductsSection
        products={relatedProducts}
        title='Related Products'
        description='Other products you might like'
        className='pb-0 pt-6 md:pt-10'
      />
      <ProductReviews reviews={reviews} />
    </div>
  );
}
