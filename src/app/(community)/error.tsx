'use client';

import { ErrorFallback, type ErrorFallbackProps } from '@/components/ErrorFallback';

export default function CommunityError(props: ErrorFallbackProps) {
  return <ErrorFallback {...props} homeHref="/community" />;
}
