import { ScrollArea } from '~/components/ui/scroll-area';
import { SidebarNav } from '~/components/layouts/sidebar-nav';

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
      <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block'>
        <ScrollArea className='py-6 pr-6 lg:py-8'>
          <SidebarNav />
        </ScrollArea>
      </aside>
      <div className='flex w-full flex-col overflow-hidden'>{children}</div>
    </div>
  );
}
