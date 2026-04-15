import { useRouter } from 'next/navigation';

import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { EDITOR_MESSAGES } from '@/constants/messages';

interface ErrorFallbackProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  const router = useRouter();

  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertCircle className="size-16 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900">{EDITOR_MESSAGES.ERROR_CANNOT_LOAD}</h1>
        <p className="max-w-md text-sm text-gray-600">{error}</p>
        <div className="flex gap-2">
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              {EDITOR_MESSAGES.ERROR_RETRY}
            </Button>
          )}
          <Button onClick={() => router.push('/myroadmap')}>
            {EDITOR_MESSAGES.ERROR_BACK_TO_ROADMAPS}
          </Button>
        </div>
      </div>
    </div>
  );
}
