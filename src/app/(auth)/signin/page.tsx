import { type Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '~/lib/actions/auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';

import { OAuthSignIn } from '../_components/oauth-signin';
import { SignInForm } from '../_components/signin-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

export default async function SignInPage() {
  const session = await auth();

  if (session) return redirect('/');

  return (
    <div className='container mx-auto max-w-xl py-20'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Sign in</CardTitle>
          <CardDescription>Choose your preferred sign in method</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <OAuthSignIn />
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className='flex flex-wrap items-center justify-between gap-2'>
          <div className='text-sm text-muted-foreground'>
            <span className='mr-1 hidden sm:inline-block'>Don&apos;t have an account?</span>
            <Link
              aria-label='Sign up'
              href='/signup'
              className='text-primary underline-offset-4 transition-colors hover:underline'
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label='Reset password'
            href='/signin/reset-password'
            className='text-sm text-primary underline-offset-4 transition-colors hover:underline'
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
