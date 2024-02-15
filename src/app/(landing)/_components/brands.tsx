import Image from 'next/image';
import Link from 'next/link';

import { getBrands } from '~/lib/fetchers/brands';

import { ContentSection } from './content-section';

export async function Brands() {
  const brands = await getBrands();

  return (
    <ContentSection title='Our Premium Brands' description='Explore our premium brands from around the world'>
      <div className='grid grid-cols-2 border-[0.5px] sm:grid-cols-4'>
        {brands.map(brand => (
          <Link key={brand.slug} href={`/brands/${brand.slug}`} className='flex justify-center border-[0.5px] p-6'>
            <Image src={brand.logo ?? ''} alt={brand.slug} width={155} height={70} />
          </Link>
        ))}
      </div>
    </ContentSection>
  );
}
