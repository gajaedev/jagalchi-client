'use client';

import { ErrorFallback, type ErrorFallbackProps } from '@/components/ErrorFallback';
import { ERROR_MESSAGES } from '@/constants/messages';

export default function EditorError(props: ErrorFallbackProps) {
  return (
    <ErrorFallback {...props} homeHref="/myroadmap" homeLabel={ERROR_MESSAGES.GO_MY_ROADMAPS} />
  );
}
