import { cn } from '~/lib/utils';

type ContentSectionProps = React.HTMLAttributes<HTMLDivElement> &
  React.PropsWithChildren & {
    title: string;
    description: string;
  };

export function ContentSection({ className, title, description, children, ...props }: ContentSectionProps) {
  return (
    <div className={cn('py-20', className)} {...props}>
      <section className='container'>
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]'>{title}</h2>
          <div className='text-balance text-sm text-muted-foreground sm:text-base'>{description}</div>
        </div>
        {children}
      </section>
    </div>
  );
}
