import { getNewProducts } from '~/lib/fetchers/products';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { ProductCard } from '~/components/cards/product-card';

import { ContentSection } from './content-section';

export async function NewArrivals() {
  const products = await getNewProducts();

  return (
    <ContentSection title='New Arrivals' description='Explore our latest products' className='bg-accent'>
      <Carousel>
        <CarouselContent>
          {products.map(product => (
            <CarouselItem key={product.slug} className='sm:basis-1/3'>
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-4' />
        <CarouselNext className='right-4' />
      </Carousel>
    </ContentSection>
  );
}
