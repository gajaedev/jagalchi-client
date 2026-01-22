import { useEffect } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { nodesAtom } from '../stores/editor-atoms';
import { createJagalchiNode } from '../utils/node-factory';

/**
 * Auto-generate initial node (Node_1) when canvas is empty
 * Matches Figma spec: Node_1 should appear on empty canvas load
 */
export function useInitialNode() {
  const nodes = useAtomValue(nodesAtom);
  const setNodes = useSetAtom(nodesAtom);

  useEffect(() => {
    // Only create initial node if canvas is completely empty
    if (nodes.length === 0) {
      const initialNode = createJagalchiNode({
        position: { x: 250, y: 250 }, // Center position for initial node
        variant: 'white',
        label: 'Node_1', // Figma spec: first node is "Node_1"
      });

      setNodes([initialNode]);
    }
  }, [nodes.length, setNodes]);
}
