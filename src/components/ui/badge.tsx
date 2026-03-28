import * as React from 'react';
import { cn } from '@/lib/utils';

function Badge({ className, style, ...props }: React.ComponentProps<'div'> & { variant?: string }) {
  return <div className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold', className)} style={{ borderColor: 'var(--border)', background: 'var(--secondary)', color: 'var(--secondary-foreground)', ...style }} {...props} />;
}

export { Badge };
