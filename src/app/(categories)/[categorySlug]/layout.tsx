import { CategoryFilters } from '../_components/category-filters';

export default function CategoriesLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='container pb-8 pt-6 md:py-8'>
      <div className='mb-8 space-y-1'>
        <div className='flex flex-col gap-6 lg:flex-row lg:gap-10'>
          <CategoryFilters />
          {children}
        </div>
      </div>
    </div>
  );
}
