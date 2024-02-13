import { getFeaturedProducts, getNewProducts, getTopProducts, getWholeSaleProducts } from '~/lib/fetchers/products';

import { Brands } from './_components/brands';
import { Hero } from './_components/hero';
import { ProductsSection } from './_components/products-section';

export default async function HomePage() {
  const newProductsPromise = getNewProducts();
  const topProductsPromise = getTopProducts();
  const featuredProductsPromise = getFeaturedProducts();
  const wholeSaleProductsPromise = getWholeSaleProducts();

  const [newProducts, topProducts, featuredProducts, wholeSaleProducts] = await Promise.all([
    newProductsPromise,
    topProductsPromise,
    featuredProductsPromise,
    wholeSaleProductsPromise,
  ]);

  return (
    <div className='pb-20'>
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
    </div>
  );
}
