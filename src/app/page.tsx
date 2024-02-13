import { Brands } from './_components/brands';
import { Hero } from './_components/hero';
import { NewArrivals } from './_components/new-arrivals';

export default function HomePage() {
  return (
    <div className='pb-20'>
      <Hero />
      <Brands />
      <NewArrivals />
    </div>
  );
}
