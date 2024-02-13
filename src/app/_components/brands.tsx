import Image from 'next/image';
import Link from 'next/link';

import { getStores } from '~/lib/fetchers/stores';

export async function Brands() {
  const stores = await getStores();

  return (
    <div className='py-20'>
      <section className='container'>
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]'>
            Our Premium Brands
          </h2>
          <div className='text-balance text-sm text-muted-foreground sm:text-base'>
            Explore our premium brands from around the world
          </div>
        </div>
        <div className='grid grid-cols-2 border-[0.5px] sm:grid-cols-4'>
          {stores.map(store => (
            <Link key={store.slug} href={`/stores/${store.slug}`} className='flex justify-center border-[0.5px] p-6'>
              <Image src={store.logo ?? ''} alt={store.slug} width={70} height={155} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
