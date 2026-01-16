import { useMemo } from 'react';

import { useAtomValue } from 'jotai';

import {
  flowNodesAtom,
  flowEdgesAtom,
  selectedNodeIdsAtom,
  selectedEdgeIdsAtom,
  selectionTypeAtom,
} from '../stores/editor-atoms';

import type {
  NodeData,
  LineData,
  LineStyle,
  SectionData,
  TextData,
  ElementData,
} from '../types/editor.types';

interface SidebarData {
  nodeData?: NodeData;
  lineData?: LineData;
  sectionData?: SectionData;
  textData?: TextData;
  selectedCount: number;
  commonProperties?: Partial<ElementData>;
}

/**
 * Hook to extract and format data for sidebar components based on current selection.
 * Returns appropriate data shape for NodeSidebar, LineSidebar, SectionSidebar, TextSidebar, or MultiSelectionSidebar.
 */
export function useSidebarData(): SidebarData {
  const nodes = useAtomValue(flowNodesAtom);
  const edges = useAtomValue(flowEdgesAtom);
  const selectedNodeIds = useAtomValue(selectedNodeIdsAtom);
  const selectedEdgeIds = useAtomValue(selectedEdgeIdsAtom);
  const selectionType = useAtomValue(selectionTypeAtom);

  return useMemo(() => {
    const selectedCount = selectedNodeIds.length + selectedEdgeIds.length;

    // No selection
    if (selectedCount === 0 || !selectionType) {
      return { selectedCount: 0 };
    }

    // Single node selection
    if (selectionType === 'node' && selectedNodeIds.length === 1) {
      const node = nodes.find((n) => n.id === selectedNodeIds[0]);
      if (
        node?.data &&
        node.type === 'custom-node' &&
        'title' in node.data &&
        'description' in node.data &&
        'resources' in node.data
      ) {
        return {
          nodeData: {
            title: node.data.title,
            description: node.data.description,
            resources: node.data.resources,
            color: node.data.color,
            isLocked: node.data.isLocked,
          },
          selectedCount: 1,
        };
      }
    }

    // Single section selection
    if (selectionType === 'section' && selectedNodeIds.length === 1) {
      const node = nodes.find((n) => n.id === selectedNodeIds[0]);
      if (node?.data && node.type === 'custom-section' && 'title' in node.data) {
        return {
          sectionData: {
            title: node.data.title,
            color: node.data.color,
            isLocked: node.data.isLocked,
          },
          selectedCount: 1,
        };
      }
    }

    // Single text selection
    if (selectionType === 'text' && selectedNodeIds.length === 1) {
      const node = nodes.find((n) => n.id === selectedNodeIds[0]);
      if (node?.data && node.type === 'custom-text' && 'content' in node.data) {
        return {
          textData: {
            content: node.data.content,
            fontSize: node.data.fontSize,
            fontWeight: node.data.fontWeight,
            color: node.data.color,
            isLocked: node.data.isLocked,
          },
          selectedCount: 1,
        };
      }
    }

    // Single line selection
    if (selectionType === 'line' && selectedEdgeIds.length === 1) {
      const edge = edges.find((e) => e.id === selectedEdgeIds[0]);
      if (edge?.data) {
        return {
          lineData: {
            style: (edge.data.style as LineStyle) || 'solid',
            color: (edge.data.color as string) || '#000000',
            label: edge.data.label as string | undefined,
          },
          selectedCount: 1,
        };
      }
    }

    // Multi-selection - extract common properties
    if (selectedCount > 1) {
      const selectedNodes = nodes.filter((n) => selectedNodeIds.includes(n.id));
      const selectedEdges = edges.filter((e) => selectedEdgeIds.includes(e.id));

      // Get common color if all selected elements have the same color
      const allElements = [
        ...selectedNodes.map((n) => n.data),
        ...selectedEdges.map((e) => e.data),
      ];
      const colors = allElements.map((el) => el?.color).filter(Boolean) as string[];
      const commonColor =
        colors.length > 0 && colors.every((c) => c === colors[0]) ? colors[0] : undefined;

      return {
        selectedCount,
        commonProperties: {
          color: commonColor as string | undefined,
          type: selectionType as 'node' | 'line' | 'section' | 'text',
        },
      };
    }

    return { selectedCount };
  }, [nodes, edges, selectedNodeIds, selectedEdgeIds, selectionType]);
}
