'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { JWTPayload } from '~/types';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updateUser } from '~/lib/actions/user';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { LoadingButton } from '~/components/loading-button';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});

type UpdateAccountFormProps = {
  session: JWTPayload;
};

export function UpdateAccountForm({ session }: UpdateAccountFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session.name ?? '',
    },
  });

  async function onSubmit({ name }: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await updateUser(name);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className='px-1'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='space-y-0.5'>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name' autoCapitalize='none' autoComplete='off' autoCorrect='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton className='mt-4 w-full' isLoading={isLoading}>
          Update Account
        </LoadingButton>
      </form>
    </Form>
  );
}
