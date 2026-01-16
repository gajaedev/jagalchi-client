'use client';

import { useCallback } from 'react';

import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import { useAtomValue } from 'jotai';

import { flowNodesAtom, flowEdgesAtom } from '@/features/editor/stores/editor-atoms';

export function EditorCanvas() {
  const nodes = useAtomValue(flowNodesAtom);
  const edges = useAtomValue(flowEdgesAtom);

  const onNodesChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (changes: any) => {
      // TODO: Handle node changes with proper types
      // eslint-disable-next-line no-console
      console.log('Nodes changed:', changes);
    },
    [],
  );

  const onEdgesChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (changes: any) => {
      // TODO: Handle edge changes with proper types
      // eslint-disable-next-line no-console
      console.log('Edges changed:', changes);
    },
    [],
  );

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
