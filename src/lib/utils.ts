import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';

import { toast } from '~/components/ui/toaster';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = '') {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function catchError(err: unknown) {
  if (err instanceof ZodError) {
    const errors = err.issues.map(issue => {
      return issue.message;
    });
    return toast.error(errors.join('\n'));
  } else if (err instanceof Error) {
    return toast.error(err.message);
  } else {
    return toast.error('Something went wrong, please try again later.');
  }
}
