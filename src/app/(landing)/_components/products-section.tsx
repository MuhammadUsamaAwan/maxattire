import { type Products } from '~/lib/fetchers/products';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';
import { ProductCard } from '~/components/cards/product-card';

import { ContentSection } from './content-section';

type ProductsSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  products: Products;
  title: string;
  description: string;
};

export function ProductsSection({ products, ...props }: ProductsSectionProps) {
  return (
    <ContentSection {...props}>
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
