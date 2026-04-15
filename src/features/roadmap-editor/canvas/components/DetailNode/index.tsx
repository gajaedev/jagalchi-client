'use client';

import { memo, useCallback } from 'react';

import { useReactFlow } from '@xyflow/react';
import { useSetAtom } from 'jotai';

import { DetailNodeBase } from '@/components/roadmap/nodes/DetailNodeBase';
import { nodesAtom } from '@/features/roadmap-editor/stores/editor-atoms';
import { createDetailNode } from '@/features/roadmap-editor/utils/node-factory';
import type { JagalchiNodeData } from '@/types/roadmap.types';

import { PlusButtonHandle } from '../PlusButtonHandle';

interface DetailNodeProps {
  data: JagalchiNodeData;
  selected?: boolean;
  id: string;
}

const POSITION_OFFSET = 250;

export const DetailNode = memo(function DetailNode({ data, selected, id }: DetailNodeProps) {
  const setNodes = useSetAtom(nodesAtom);
  const { getNode } = useReactFlow();

  const handleCreateNode = useCallback(
    (position: 'top' | 'right' | 'bottom' | 'left') => {
      const currentNode = getNode(id);
      if (!currentNode) return;

      const offsets = {
        top: { x: 0, y: -POSITION_OFFSET },
        bottom: { x: 0, y: POSITION_OFFSET },
      };

      const offset = offsets[position as 'top' | 'bottom'];
      if (!offset) return;

      const newNode = createDetailNode({
        position: {
          x: currentNode.position.x + offset.x,
          y: currentNode.position.y + offset.y,
        },
        variant: data.variant,
      });

      setNodes((prevNodes) => [...prevNodes, newNode]);
    },
    [id, data.variant, getNode, setNodes],
  );

  return (
    <DetailNodeBase data={data} selected={selected}>
      {selected && (
        <>
          <PlusButtonHandle position="top" onCreateNode={handleCreateNode} />
          <PlusButtonHandle position="bottom" onCreateNode={handleCreateNode} />
        </>
      )}
    </DetailNodeBase>
  );
});
