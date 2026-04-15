import { forwardRef, useId } from 'react';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export interface EditorInputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  isMultiline?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
  className?: string;
}

/**
 * 에디터 전용 입력 필드 컴포넌트
 *
 * Figma 디자인에 맞춘 36px 높이의 입력 필드로,
 * 단일 라인 input과 멀티라인 textarea를 지원합니다.
 *
 * @example
 * ```tsx
 * <EditorInput
 *   label="노드 이름"
 *   placeholder="이름을 입력하세요"
 *   value={name}
 *   onChange={setName}
 * />
 * ```
 */
export const EditorInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, EditorInputProps>(
  (
    {
      label,
      value,
      placeholder,
      onChange,
      onBlur,
      isMultiline = false,
      hasError = false,
      errorMessage,
      isDisabled = false,
      className,
    },
    ref,
  ) => {
    const id = useId();
    const errorId = `${id}-error`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange?.(e.target.value);
    };

    const baseClasses = cn(
      // Figma 정확한 스타일
      'w-full min-h-[36px] px-3 py-[7.5px]',
      'bg-white border border-slate-200 rounded-lg',
      'shadow-sm',
      // 폰트
      'text-sm leading-[21px] tracking-[0.07px]',
      'text-slate-950 placeholder:text-slate-500',
      // 인터랙션
      'outline-none transition-colors',
      'focus-visible:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-100',
      // 에러 상태
      hasError && ['border-red-500', 'focus-visible:border-red-500 focus-visible:ring-red-100'],
      // Disabled 상태
      isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      className,
    );

    const Component = isMultiline ? 'textarea' : 'input';

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <Label htmlFor={id} className="text-sm font-medium text-slate-950">
            {label}
          </Label>
        )}
        <Component
          ref={ref as never}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
          disabled={isDisabled}
          aria-invalid={hasError}
          aria-describedby={hasError && errorMessage ? errorId : undefined}
          className={baseClasses}
          {...(isMultiline && { rows: 3 })}
        />
        {hasError && errorMessage && (
          <p id={errorId} className="text-xs text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

EditorInput.displayName = 'EditorInput';
