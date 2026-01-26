'use client';

import { forwardRef, useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';

interface EditorCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  indeterminate?: boolean;
}

export const EditorCheckbox = forwardRef<HTMLInputElement, EditorCheckboxProps>(
  ({ label, indeterminate = false, className, checked, ...props }, ref) => {
    const defaultRef = useRef<HTMLInputElement>(null);
    const checkboxRef = (ref as React.RefObject<HTMLInputElement>) || defaultRef;

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, checkboxRef]);

    return (
      <div className="flex items-center gap-2">
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={checked}
          className={cn(
            'focus:ring-primary-500 text-primary-500 h-4 w-4 rounded border-neutral-300 focus:ring-2 focus:ring-offset-0',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
        {label && (
          <label
            className={cn(
              'text-sm text-neutral-700',
              props.disabled && 'cursor-not-allowed opacity-50',
            )}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

EditorCheckbox.displayName = 'EditorCheckbox';
