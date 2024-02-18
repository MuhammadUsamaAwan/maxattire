'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { paymentSchema } from '~/lib/validations/payment';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';

export function PaymentForm() {
  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: '',
      card: '',
      cvc: '',
      month: '',
      year: '',
    },
  });

  async function onSubmit({ name, card, cvc, month, year }: z.infer<typeof paymentSchema>) {}

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className='space-y-3 p-1'>
        <Card>
          <CardHeader>
            <CardTitle>Pay by Card</CardTitle>
            <CardDescription>Enter your card information.</CardDescription>
          </CardHeader>
          <CardContent className='space-y-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='card'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card</FormLabel>
                  <FormControl>
                    <Input placeholder='Card' inputMode='numeric' pattern='[0-9]{16}' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='grid grid-cols-3 gap-2'>
              <FormField
                control={form.control}
                name='month'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expire Month</FormLabel>
                    <FormControl>
                      <Input placeholder='Expire Month' inputMode='numeric' pattern='1[0-2]|[1-9]' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='year'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expire Year</FormLabel>
                    <FormControl>
                      <Input placeholder='Expire Year' inputMode='numeric' pattern='2[0-9]{3}' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cvc'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder='CVC' inputMode='numeric' pattern='[0-9]{3}' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className='ml-auto' type='submit'>
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
