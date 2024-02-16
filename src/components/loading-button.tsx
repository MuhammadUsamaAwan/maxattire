'use client';

import * as React from 'react';

import { cn } from '~/lib/utils';
import { Button, buttonVariants, type ButtonProps } from '~/components/ui/button';
import { Icons } from '~/components/icons';

type LoadingButtonProps = ButtonProps & {
  isLoading?: boolean;
};

const LoadingButton = React.forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ className, variant, size, isLoading = false, disabled, ...props }, ref) => {
    return (
      <Button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
        ref={ref}
      >
        {isLoading && <Icons.spinner className='mr-2 size-4 animate-spin' aria-hidden='true' />}
        {props.children}
      </Button>
    );
  }
);
LoadingButton.displayName = 'LoadingButton';

export { LoadingButton };
