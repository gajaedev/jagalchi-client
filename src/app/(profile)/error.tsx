'use client';

import { ErrorFallback, type ErrorFallbackProps } from '@/components/ErrorFallback';

export default function ProfileError(props: ErrorFallbackProps) {
  return <ErrorFallback {...props} homeHref="/profile" />;
}
