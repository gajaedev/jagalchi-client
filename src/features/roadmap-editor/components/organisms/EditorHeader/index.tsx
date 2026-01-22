'use client';

import { memo } from 'react';

import { useRouter } from 'next/navigation';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ArrowLeft, RotateCcw, RotateCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  roadmapTitleAtom,
  undoAtom,
  redoAtom,
  canUndoAtom,
  canRedoAtom,
} from '../../../stores/editor-atoms';

export const EditorHeader = memo(function EditorHeader() {
  const router = useRouter();
  const [title, setTitle] = useAtom(roadmapTitleAtom);

  const canUndo = useAtomValue(canUndoAtom);
  const canRedo = useAtomValue(canRedoAtom);
  const undo = useSetAtom(undoAtom);
  const redo = useSetAtom(redoAtom);

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

      <div className="ml-auto flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          disabled={!canUndo}
          onClick={() => undo()}
          aria-label="실행 취소 (Ctrl+Z)"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled={!canRedo}
          onClick={() => redo()}
          aria-label="다시 실행 (Ctrl+Shift+Z)"
        >
          <RotateCw className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
});
