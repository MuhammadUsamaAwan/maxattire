'use client';

import Autoplay from 'embla-carousel-autoplay';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';

export function Hero() {
  return (
    <Carousel className='w-full' plugins={[Autoplay()]}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className='flex h-[500px] items-center justify-center border-b p-6'>
              <span className='text-4xl font-semibold'>{index + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-4' />
      <CarouselNext className='right-4' />
    </Carousel>
  );
}
