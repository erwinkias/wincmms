import * as React from 'react';

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-flex">{children}</div>;
}

export function DropdownMenuTrigger({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function DropdownMenuContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`absolute right-0 top-12 z-50 min-w-48 rounded-md border bg-popover p-2 shadow-md ${className}`}>{children}</div>;
}

export function DropdownMenuItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`cursor-default rounded-sm px-2 py-1.5 text-sm hover:bg-accent ${className}`}>{children}</div>;
}
