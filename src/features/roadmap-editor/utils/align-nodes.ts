import type { RoadmapNode } from '../types/editor.types';

export type AlignDirection = 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom';

/**
 * Align selected nodes based on direction
 * @param nodes - All roadmap nodes
 * @param selectedIds - IDs of nodes to align
 * @param direction - Alignment direction
 * @returns Updated nodes array with aligned positions
 */
export function alignNodes(
  nodes: RoadmapNode[],
  selectedIds: string[],
  direction: AlignDirection,
): RoadmapNode[] {
  if (selectedIds.length < 2) return nodes;

  const selectedNodes = nodes.filter((node) => selectedIds.includes(node.id));

  // Calculate target position based on direction
  let targetValue: number;

  switch (direction) {
    case 'left': {
      const minX = Math.min(...selectedNodes.map((node) => node.position.x));
      targetValue = minX;
      return nodes.map((node) =>
        selectedIds.includes(node.id)
          ? { ...node, position: { ...node.position, x: targetValue } }
          : node,
      );
    }

    case 'right': {
      const maxX = Math.max(
        ...selectedNodes.map((node) => node.position.x + (node.measured?.width ?? 0)),
      );
      return nodes.map((node) => {
        if (!selectedIds.includes(node.id)) return node;
        const width = node.measured?.width ?? 0;
        return { ...node, position: { ...node.position, x: maxX - width } };
      });
    }

    case 'center': {
      const positions = selectedNodes.map((node) => ({
        left: node.position.x,
        right: node.position.x + (node.measured?.width ?? 0),
      }));
      const minX = Math.min(...positions.map((p) => p.left));
      const maxX = Math.max(...positions.map((p) => p.right));
      const centerX = (minX + maxX) / 2;

      return nodes.map((node) => {
        if (!selectedIds.includes(node.id)) return node;
        const width = node.measured?.width ?? 0;
        return { ...node, position: { ...node.position, x: centerX - width / 2 } };
      });
    }

    case 'top': {
      const minY = Math.min(...selectedNodes.map((node) => node.position.y));
      targetValue = minY;
      return nodes.map((node) =>
        selectedIds.includes(node.id)
          ? { ...node, position: { ...node.position, y: targetValue } }
          : node,
      );
    }

    case 'bottom': {
      const maxY = Math.max(
        ...selectedNodes.map((node) => node.position.y + (node.measured?.height ?? 0)),
      );
      return nodes.map((node) => {
        if (!selectedIds.includes(node.id)) return node;
        const height = node.measured?.height ?? 0;
        return { ...node, position: { ...node.position, y: maxY - height } };
      });
    }

    case 'middle': {
      const positions = selectedNodes.map((node) => ({
        top: node.position.y,
        bottom: node.position.y + (node.measured?.height ?? 0),
      }));
      const minY = Math.min(...positions.map((p) => p.top));
      const maxY = Math.max(...positions.map((p) => p.bottom));
      const centerY = (minY + maxY) / 2;

      return nodes.map((node) => {
        if (!selectedIds.includes(node.id)) return node;
        const height = node.measured?.height ?? 0;
        return { ...node, position: { ...node.position, y: centerY - height / 2 } };
      });
    }

    default:
      return nodes;
  }
}
