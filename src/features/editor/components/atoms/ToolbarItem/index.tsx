'use client';

import { cn } from '@/lib/utils';

interface ToolbarItemProps {
  icon: React.ReactNode;
  label?: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ToolbarItem({
  icon,
  label,
  active = false,
  disabled = false,
  onClick,
  className,
}: ToolbarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'rounded-lg px-3 py-2',
        'text-sm font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
        active && 'bg-primary text-primary-foreground',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      <span className="size-4">{icon}</span>
      {label && <span>{label}</span>}
    </button>
  );
}
