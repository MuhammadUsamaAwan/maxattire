import { redirect } from 'next/navigation';

import { auth } from '~/lib/actions/auth';
import { getAddresses } from '~/lib/fetchers/addresses';
import { Separator } from '~/components/ui/separator';

import ManageAdresses from './_components/manage-addresses';
import { UpdateAccountForm } from './_components/update-account-form';

export default async function AccountPage() {
  const session = await auth();
  const addresses = await getAddresses();

  if (!session) {
    redirect('/signin');
  }

  return (
    <div className='grid items-center gap-8 pb-8 pt-6 md:py-8'>
      <div className='grid gap-1'>
        <h1 className='text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]'>Account</h1>
        <p className='max-w-[750px] text-sm text-muted-foreground sm:text-base'>Manage your account settings</p>
        <Separator className='mt-2.5' />
      </div>
      <UpdateAccountForm session={session} />
      <ManageAdresses addresses={addresses} />
    </div>
  );
}
