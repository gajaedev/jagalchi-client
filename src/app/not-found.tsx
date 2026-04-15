import Link from 'next/link';

import { FileQuestion, Home } from 'lucide-react';

import { ERROR_MESSAGES } from '@/constants/messages';

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <FileQuestion className="mb-6 h-16 w-16 text-slate-400" />
        <h1 className="mb-2 text-2xl font-bold text-slate-900">
          {ERROR_MESSAGES.NOT_FOUND_HEADING}
        </h1>
        <p className="mb-8 text-slate-500">{ERROR_MESSAGES.NOT_FOUND_DESCRIPTION}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800"
        >
          <Home className="h-4 w-4" />
          {ERROR_MESSAGES.GO_HOME_FULL}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
