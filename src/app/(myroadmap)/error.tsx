'use client';

import Link from 'next/link';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

import { ERROR_MESSAGES } from '@/constants/messages';

interface MyroadmapErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function MyroadmapErrorPage({ error, reset }: MyroadmapErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <AlertTriangle className="mb-6 h-16 w-16 text-slate-400" />
        <h1 className="mb-2 text-2xl font-bold text-slate-900">{ERROR_MESSAGES.GENERIC_HEADING}</h1>
        <p className="mb-8 text-slate-500">{ERROR_MESSAGES.GENERIC_DESCRIPTION}</p>
        {process.env.NODE_ENV === 'development' && error.message && (
          <pre className="mb-8 w-full overflow-auto rounded-lg bg-slate-100 p-4 text-left text-sm text-slate-700">
            {error.message}
          </pre>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
          >
            <RefreshCw className="h-4 w-4" />
            {ERROR_MESSAGES.RETRY_BUTTON}
          </button>
          <Link
            href="/myroadmap"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Home className="h-4 w-4" />
            {ERROR_MESSAGES.GO_MY_ROADMAPS}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyroadmapErrorPage;
