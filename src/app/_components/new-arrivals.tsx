import { getNewProducts } from '~/lib/fetchers/products';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { ProductCard } from '~/components/cards/product-card';

export async function NewArrivals() {
  const products = await getNewProducts();

  return (
    <div className='bg-accent py-20'>
      <section className='container'>
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]'>
            New Arrivals
          </h2>
          <div className='text-balance text-sm text-muted-foreground sm:text-base'>Explore our latest products</div>
        </div>
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
      </section>
    </div>
  );
}
