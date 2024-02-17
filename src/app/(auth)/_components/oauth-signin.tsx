import Link from 'next/link';

import { env } from '~/env';
import { absoluteUrl } from '~/lib/utils';
import { buttonVariants } from '~/components/ui/button';
import { Icons } from '~/components/icons';

export function OAuthSignIn() {
  return (
    <Link
      href={`https://accounts.google.com/o/oauth2/auth?client_id=${env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${absoluteUrl()}/api/auth/callback/google&response_type=code&scope=openid%20email%20profile`}
      className={buttonVariants({ variant: 'secondary' })}
    >
      <Icons.google className='mr-2 size-4' />
      Google
    </Link>
  );
}
