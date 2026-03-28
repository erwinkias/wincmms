import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
type Size = 'default' | 'sm' | 'lg';

const variantClasses: Record<Variant, string> = {
  default: 'bg-primary text-primary-foreground',
  outline: 'border border-border bg-background text-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  ghost: 'bg-transparent text-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
};

const sizeClasses: Record<Size, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 px-3 py-2 text-sm',
  lg: 'h-11 px-8 py-3',
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, style, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn('inline-flex items-center justify-center gap-2 rounded-md font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-50', variantClasses[variant], sizeClasses[size], className)}
        style={{ ...style }}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
