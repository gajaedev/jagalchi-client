'use client';

import { memo } from 'react';

import { useRouter } from 'next/navigation';

import { useAtom } from 'jotai';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { roadmapTitleAtom } from '../../../stores/editor-atoms';

export const EditorHeader = memo(function EditorHeader() {
  const router = useRouter();
  const [title, setTitle] = useAtom(roadmapTitleAtom);

  return (
    <header className="bg-background flex h-14 items-center gap-4 border-b px-4">
      <Button variant="ghost" size="icon" onClick={() => router.push('/')} aria-label="뒤로가기">
        <ArrowLeft className="h-5 w-5" />
      </Button>

      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="max-w-md border-none text-lg font-semibold focus-visible:ring-0"
        placeholder="Jagalchi Roadmap"
      />
    </header>
  );
});
