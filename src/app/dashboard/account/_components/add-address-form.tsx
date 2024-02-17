'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addAddress } from '~/lib/actions/addresses';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { LoadingButton } from '~/components/loading-button';

const formSchema = z.object({
  phone: z.string().min(1, {
    message: 'Phone is required',
  }),
  address: z.string().min(1, {
    message: 'Address is required',
  }),
  state: z.string().min(1, {
    message: 'State is required',
  }),
  city: z.string().min(1, {
    message: 'City is required',
  }),
  postalCode: z.string(),
});

type AddAddressFormProps = {
  onSuccess: () => void;
};

export function AddAddressForm({ onSuccess }: AddAddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      state: '',
      city: '',
      postalCode: '',
    },
  });

  async function onSubmit({ phone, address, state, city, postalCode }: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await addAddress({
      address,
      state,
      city,
      postalCode,
      phone,
    });
    onSuccess();
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className='space-y-3'>
        <FormField
          control={form.control}
          name='phone'
          render={({ field }) => (
            <FormItem className='space-y-0.5'>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  placeholder='Phone number'
                  type='tel'
                  autoCapitalize='none'
                  autoComplete='off'
                  autoCorrect='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem className='space-y-0.5'>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder='Street address'
                  autoCapitalize='none'
                  autoComplete='off'
                  autoCorrect='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='state'
          render={({ field }) => (
            <FormItem className='space-y-0.5'>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder='State' autoCapitalize='none' autoComplete='off' autoCorrect='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem className='space-y-0.5'>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder='City' autoCapitalize='none' autoComplete='off' autoCorrect='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='postalCode'
          render={({ field }) => (
            <FormItem className='space-y-0.5'>
              <FormLabel>Zip / Postal Code</FormLabel>
              <FormControl>
                <Input
                  placeholder='Zip / Postal Code'
                  autoCapitalize='none'
                  autoComplete='off'
                  autoCorrect='off'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton className='w-full' isLoading={isLoading}>
          Add Address
        </LoadingButton>
      </form>
    </Form>
  );
}
