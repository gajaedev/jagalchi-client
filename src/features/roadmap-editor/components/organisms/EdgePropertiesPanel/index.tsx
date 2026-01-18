'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { edgesAtom } from '../../../stores/editor-atoms';

import type { Edge } from '@xyflow/react';

interface EdgePropertiesPanelProps {
  edge: Edge;
}

export const EdgePropertiesPanel = memo(function EdgePropertiesPanel({
  edge,
}: EdgePropertiesPanelProps) {
  const setEdges = useSetAtom(edgesAtom);

  const updateEdge = (label: string) => {
    setEdges((prev) => prev.map((e) => (e.id === edge.id ? { ...e, label } : e)));
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="edge-label">{EDITOR_MESSAGES.SIDEBAR_EDGE_LABEL_LABEL}</Label>
        <Input
          id="edge-label"
          value={(edge.label as string) ?? ''}
          onChange={(e) => updateEdge(e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
});
