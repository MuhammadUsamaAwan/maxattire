'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import type { JWTPayload } from '~/types';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { addAddress } from '~/lib/actions/addresses';
import { updateUser } from '~/lib/actions/user';
import { type Addresses } from '~/lib/fetchers/addresses';
import { orderConfirmSchema } from '~/lib/validations/order';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { LoadingButton } from '~/components/loading-button';

type OrderConfirmFormProps = {
  session: JWTPayload;
  addresses: Addresses;
};

export function OrderConfirmForm({ session, addresses }: OrderConfirmFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof orderConfirmSchema>>({
    resolver: zodResolver(orderConfirmSchema),
    defaultValues: {
      name: session.name ?? '',
      phone: '',
      existingOrNewAddress: 'existing',
      existingAddress: '',
      address: '',
      state: '',
      city: '',
      postalCode: '',
    },
  });

  async function onSubmit({
    name,
    phone,
    existingAddress,
    existingOrNewAddress,
    address,
    state,
    city,
    postalCode,
  }: z.infer<typeof orderConfirmSchema>) {
    setIsLoading(true);
    let addressId: number | null = null;
    if (name !== session.name) {
      await updateUser(name);
    }
    if (existingOrNewAddress === 'new') {
      addressId = await addAddress({
        address,
        state,
        city,
        postalCode,
        phone,
      });
    }
    // const orderId = await createOrder({
    //   addressId: addressId ?? Number(existingAddress),
    // });
    // router.push(`/payment/${orderId}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className='space-y-3'>
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
        <FormField
          control={form.control}
          name='existingOrNewAddress'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className='flex space-x-4'>
                  <FormItem className='flex items-center space-x-1.5 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='existing' />
                    </FormControl>
                    <FormLabel className='font-normal'>Existing Address</FormLabel>
                  </FormItem>
                  <FormItem className='flex items-center space-x-1.5 space-y-0'>
                    <FormControl>
                      <RadioGroupItem value='new' />
                    </FormControl>
                    <FormLabel className='font-normal'>New Address</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.watch('existingOrNewAddress') === 'existing' ? (
          <FormField
            control={form.control}
            name='existingAddress'
            render={({ field }) => (
              <FormItem className='space-y-0.5'>
                <FormLabel>Address</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select address' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {addresses.map(address => (
                      <SelectItem key={address.id} value={String(address.id)}>
                        {address.address} - {address.city} - {address.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <>
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
          </>
        )}
        <LoadingButton className='w-full' isLoading={isLoading}>
          Confirm Order
        </LoadingButton>
      </form>
    </Form>
  );
}
