import Image from 'next/image';
import Link from 'next/link';

import { getStores } from '~/lib/fetchers/stores';

import { ContentSection } from './content-section';

export async function Brands() {
  const stores = await getStores();

  return (
    <ContentSection title='Our Premium Brands' description='Explore our premium brands from around the world'>
      <div className='grid grid-cols-2 border-[0.5px] sm:grid-cols-4'>
        {stores.map(store => (
          <Link key={store.slug} href={`/brands/${store.slug}`} className='flex justify-center border-[0.5px] p-6'>
            <Image src={store.logo ?? ''} alt={store.slug} width={155} height={70} />
          </Link>
        ))}
      </div>
    </ContentSection>
  );
}
