import { z } from 'zod';

export const orderConfirmSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required',
    }),
    phone: z.string(),
    existingAddress: z.string(),
    existingOrNewAddress: z.enum(['existing', 'new']),
    address: z.string(),
    state: z.string(),
    city: z.string(),
    postalCode: z.string(),
  })
  .refine(
    data => {
      if (data.existingOrNewAddress === 'existing' && data.existingAddress === '') {
        return false;
      }
      return true;
    },
    {
      message: 'Address is required',
      path: ['existingAddress'],
    }
  )
  .refine(
    data => {
      if (data.existingOrNewAddress === 'new' && data.phone === '') {
        return false;
      }
      return true;
    },
    {
      message: 'Phone is required',
      path: ['phone'],
    }
  )
  .refine(
    data => {
      if (data.existingOrNewAddress === 'new' && data.address === '') {
        return false;
      }
      return true;
    },
    {
      message: 'Address is required',
      path: ['address'],
    }
  )
  .refine(
    data => {
      if (data.existingOrNewAddress === 'new' && data.state === '') {
        return false;
      }
      return true;
    },
    {
      message: 'State is required',
      path: ['state'],
    }
  )
  .refine(
    data => {
      if (data.existingOrNewAddress === 'new' && data.city === '') {
        return false;
      }
      return true;
    },
    {
      message: 'City is required',
      path: ['city'],
    }
  );

export const orderCreateSchema = z.object({
  addressId: z.number(),
});
