'use client';

import { useRouter } from 'next/navigation';

import { ChevronLeft } from 'lucide-react';

export function EditorHeader() {
  const router = useRouter();

  return (
    <div className="flex h-14 items-center gap-2 px-4 py-3">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-sm hover:underline"
        aria-label="뒤로 가기"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Jagalchi Roadmap</span>
      </button>
    </div>
  );
}
