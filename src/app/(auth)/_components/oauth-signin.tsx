import { signInWithGoogle } from '~/lib/actions/auth';
import { Button } from '~/components/ui/button';
import { Icons } from '~/components/icons';

export function OAuthSignIn() {
  return (
    <form action={signInWithGoogle}>
      <Button variant='secondary' className='w-full'>
        <Icons.google className='mr-2 size-4' />
        Google
      </Button>
    </form>
  );
}
