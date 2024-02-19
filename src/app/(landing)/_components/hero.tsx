'use client';

import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel';

export function Hero() {
  return (
    <Carousel plugins={[Autoplay()]}>
      <CarouselContent>
        <CarouselItem>
          <Image
            src='/images/hero1.jpeg'
            alt='hero'
            width={1024}
            height={630}
            className='h-auto max-h-[500px] w-screen border-b'
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src='/images/hero2.jpeg'
            alt='hero'
            width={1024}
            height={585}
            className='h-auto max-h-[500px] w-screen border-b'
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className='left-4' />
      <CarouselNext className='right-4' />
    </Carousel>
  );
}
