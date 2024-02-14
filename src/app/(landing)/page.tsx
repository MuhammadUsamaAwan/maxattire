import { unstable_cache } from 'next/cache';

import { getFeaturedProducts, getNewProducts, getTopProducts, getWholeSaleProducts } from '~/lib/fetchers/products';

import { Brands } from './_components/brands';
import { Hero } from './_components/hero';
import { ProductsSection } from './_components/products-section';

const getCachedData = unstable_cache(
  async () => {
    const newProductsPromise = getNewProducts();
    const topProductsPromise = getTopProducts();
    const featuredProductsPromise = getFeaturedProducts();
    const wholeSaleProductsPromise = getWholeSaleProducts();
    return Promise.all([newProductsPromise, topProductsPromise, featuredProductsPromise, wholeSaleProductsPromise]);
  },
  [],
  {
    revalidate: 60, // 1 minute
  }
);

export default async function HomePage() {
  const [newProducts, topProducts, featuredProducts, wholeSaleProducts] = await getCachedData();

  return (
    <>
      <Hero />
      <Brands />
      <ProductsSection
        products={featuredProducts}
        title='Featured Products'
        description='Our featured products'
        className='bg-accent'
      />
      <ProductsSection products={newProducts} title='New Arrivals' description='Explore our latest products' />
      <ProductsSection
        products={topProducts}
        title='Top Products'
        description='Most popular products'
        className='bg-accent'
      />
      <ProductsSection products={wholeSaleProducts} title='Wholesale Products' description='Our wholesale products' />
    </>
  );
}
