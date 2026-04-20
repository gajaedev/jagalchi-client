'use client';

import { ErrorFallback, type ErrorFallbackProps } from '@/components/ErrorFallback';

export default function GlobalError(props: ErrorFallbackProps) {
  return <ErrorFallback {...props} />;
}
