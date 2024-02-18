'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { addReview } from '~/lib/actions/review';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Icons } from '~/components/icons';
import { LoadingButton } from '~/components/loading-button';

const formSchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string().min(1, {
    message: 'Review is required',
  }),
});

type Props = {
  productId: number;
  orderProductId: number;
};

export function AddReviewForm({ productId, orderProductId }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 5,
      review: '',
    },
  });

  async function onSubmit({ rating, review }: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await addReview({
      rating,
      review,
      productId,
      orderProductId,
    });
    setIsLoading(false);
    router.push(`/dashboard/orders`);
  }

  return (
    <Form {...form}>
      <form onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)} className='space-y-3 p-1'>
        <FormField
          control={form.control}
          name='rating'
          render={({ field }) => (
            <FormItem className='space-y-0.5'>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <div className='flex items-center'>
                  <Button
                    variant='outline'
                    size='icon'
                    type='button'
                    className='size-8 rounded-r-none'
                    onClick={() => {
                      const value = form.getValues('rating');
                      if (value > 1) {
                        form.setValue('rating', value - 1);
                      }
                    }}
                  >
                    <Icons.minus className='size-3' />
                  </Button>
                  <Input
                    className='h-8 w-14 rounded-none border-x-0'
                    placeholder='Rating'
                    type='number'
                    inputMode='numeric'
                    min={0}
                    max={5}
                    {...field}
                  />
                  <Button
                    variant='outline'
                    size='icon'
                    type='button'
                    className='size-8 rounded-l-none'
                    onClick={() => {
                      const value = form.getValues('rating');
                      if (value < 5) {
                        form.setValue('rating', value + 1);
                      }
                    }}
                  >
                    <Icons.plus className='size-3' />
                    <span className='sr-only'>Add one item</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='review'
          render={({ field }) => (
            <FormItem className='space-y-0.5'>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea placeholder='Review' autoCapitalize='none' autoComplete='off' autoCorrect='off' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton className='w-full' isLoading={isLoading}>
          Add Review
        </LoadingButton>
      </form>
    </Form>
  );
}
