import { useRouter } from 'next/navigation';

import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

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
        <h1 className="text-2xl font-bold text-gray-900">로드맵을 불러올 수 없습니다</h1>
        <p className="max-w-md text-sm text-gray-600">{error}</p>
        <div className="flex gap-2">
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              다시 시도
            </Button>
          )}
          <Button onClick={() => router.push('/myroadmap')}>내 로드맵으로 돌아가기</Button>
        </div>
      </div>
    </div>
  );
}
