'use client';

import { useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { MY_ROADMAPS_MESSAGES } from '@/constants/messages';

import { useDeleteRoadmap } from '../../../hooks/use-delete-roadmap';
import { useUpdateRoadmap } from '../../../hooks/use-update-roadmap';
import { RoadmapCard } from '../../atoms/RoadmapCard';

import type { RoadmapData } from '../../../types/my-roadmaps.types';

interface MyRoadmapsGridProps {
  roadmaps: RoadmapData[];
}

export function MyRoadmapsGrid({ roadmaps }: MyRoadmapsGridProps) {
  const deleteMutation = useDeleteRoadmap();
  const updateMutation = useUpdateRoadmap();

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  // Rename dialog state
  const [renameTarget, setRenameTarget] = useState<{ id: number; title: string } | null>(null);
  const [renameInput, setRenameInput] = useState('');

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget);
    setDeleteTarget(null);
  };

  const handleRenameOpen = (id: number, title: string) => {
    setRenameTarget({ id, title });
    setRenameInput(title);
  };

  const handleRenameConfirm = () => {
    if (!renameTarget || !renameInput.trim()) return;
    updateMutation.mutate({
      roadmapId: renameTarget.id,
      data: { title: renameInput.trim() },
    });
    setRenameTarget(null);
    setRenameInput('');
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-x-14 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {roadmaps.map((roadmap) => (
          <RoadmapCard
            key={roadmap.id}
            id={roadmap.id}
            title={roadmap.title}
            type={roadmap.type}
            author={roadmap.author}
            fileCount={roadmap.fileCount}
            imageUrl={roadmap.imageUrl}
            isFavorite={roadmap.isFavorite}
            onRename={() => handleRenameOpen(roadmap.id, roadmap.title)}
            onDelete={() => setDeleteTarget(roadmap.id)}
            onFavorite={() => {
              // TODO: 즐겨찾기 API 연동 (백엔드 미구현)
            }}
          />
        ))}
      </div>

      {/* Delete confirmation dialog */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{MY_ROADMAPS_MESSAGES.DELETE_TITLE}</AlertDialogTitle>
            <AlertDialogDescription>
              {MY_ROADMAPS_MESSAGES.DELETE_DESCRIPTION}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{MY_ROADMAPS_MESSAGES.DELETE_CANCEL}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteConfirm}
            >
              {MY_ROADMAPS_MESSAGES.DELETE_CONFIRM}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Rename dialog */}
      <Dialog
        open={renameTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setRenameTarget(null);
            setRenameInput('');
          }
        }}
      >
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{MY_ROADMAPS_MESSAGES.RENAME_TITLE}</DialogTitle>
          </DialogHeader>
          <Input
            value={renameInput}
            onChange={(e) => setRenameInput(e.target.value)}
            placeholder={MY_ROADMAPS_MESSAGES.RENAME_PLACEHOLDER}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRenameConfirm();
            }}
            autoFocus
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRenameTarget(null);
                setRenameInput('');
              }}
            >
              {MY_ROADMAPS_MESSAGES.RENAME_CANCEL}
            </Button>
            <Button onClick={handleRenameConfirm} disabled={!renameInput.trim()}>
              {MY_ROADMAPS_MESSAGES.RENAME_CONFIRM}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
