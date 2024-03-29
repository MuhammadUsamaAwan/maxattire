'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { signInWithCredentials } from '~/lib/actions/auth';
import { catchError } from '~/lib/utils';
import { signInSchema } from '~/lib/validations/auth';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Icons } from '~/components/icons';
import { PasswordInput } from '~/components/password-input';

type Inputs = z.infer<typeof signInSchema>;

export function SignInForm() {
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<Inputs>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: Inputs) {
    startTransition(async () => {
      try {
        await signInWithCredentials(data);
        redirect('/');
      } catch (error) {
        catchError(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form className='grid gap-4' onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='text' placeholder='example@test.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>
          {isPending && <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />}
          Sign in
          <span className='sr-only'>Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
