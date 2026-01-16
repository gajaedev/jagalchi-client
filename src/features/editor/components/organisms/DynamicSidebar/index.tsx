'use client';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { useSidebarData } from '../../../hooks/use-sidebar-data';
import {
  sidebarOpenAtom,
  selectionTypeAtom,
  flowNodesAtom,
  flowEdgesAtom,
} from '../../../stores/editor-atoms';
import { LineSidebar } from '../LineSidebar';
import { MultiSelectionSidebar } from '../MultiSelectionSidebar';
import { NodeSidebar } from '../NodeSidebar';
import { SectionSidebar } from '../SectionSidebar';
import { TextSidebar } from '../TextSidebar';

import type { NodeData, LineData, SectionData, TextData } from '../../../types/editor.types';

/**
 * Dynamic sidebar component that switches between different sidebar types
 * based on the current selection (node, line, section, text, or mixed).
 *
 * Integrates with Jotai atoms to manage selection state and element data,
 * and provides save handlers to update the React Flow state.
 */
export function DynamicSidebar() {
  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);
  const selectionType = useAtomValue(selectionTypeAtom);
  const setNodes = useSetAtom(flowNodesAtom);
  const setEdges = useSetAtom(flowEdgesAtom);

  const { nodeData, lineData, sectionData, textData, selectedCount, commonProperties } =
    useSidebarData();

  const handleNodeSave = (data: NodeData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected && node.type === 'custom-node') {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        }
        return node;
      }),
    );
  };

  const handleLineSave = (data: LineData) => {
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.selected) {
          return {
            ...edge,
            data: {
              ...edge.data,
              ...data,
            },
          };
        }
        return edge;
      }),
    );
  };

  const handleSectionSave = (data: SectionData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected && node.type === 'custom-section') {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        }
        return node;
      }),
    );
  };

  const handleTextSave = (data: TextData) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected && node.type === 'custom-text') {
          return {
            ...node,
            data: {
              ...node.data,
              ...data,
            },
          };
        }
        return node;
      }),
    );
  };

  const handleBulkUpdate = (updates: Partial<NodeData | LineData | SectionData | TextData>) => {
    // Update selected nodes
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected) {
          return {
            ...node,
            data: {
              ...node.data,
              ...updates,
            },
          };
        }
        return node;
      }),
    );

    // Update selected edges
    setEdges((edges) =>
      edges.map((edge) => {
        if (edge.selected) {
          return {
            ...edge,
            data: {
              ...edge.data,
              ...updates,
            },
          };
        }
        return edge;
      }),
    );
  };

  const handleBulkDelete = () => {
    setNodes((nodes) => nodes.filter((node) => !node.selected));
    setEdges((edges) => edges.filter((edge) => !edge.selected));
    setSidebarOpen(false);
  };

  const handleBulkDuplicate = () => {
    // TODO: Implement bulk duplicate logic
  };

  const handleBulkLock = () => {
    handleBulkUpdate({ isLocked: true });
  };

  const handleBulkUnlock = () => {
    handleBulkUpdate({ isLocked: false });
  };

  // Render appropriate sidebar based on selection type
  if (!selectionType || selectedCount === 0) {
    return null;
  }

  // Single element selection
  if (selectedCount === 1) {
    switch (selectionType) {
      case 'node':
        return (
          <NodeSidebar
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            nodeData={nodeData}
            onSave={handleNodeSave}
          />
        );
      case 'line':
        return (
          <LineSidebar
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            lineData={lineData}
            onSave={handleLineSave}
          />
        );
      case 'section':
        return (
          <SectionSidebar
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            sectionData={sectionData}
            onSave={handleSectionSave}
          />
        );
      case 'text':
        return (
          <TextSidebar
            open={sidebarOpen}
            onOpenChange={setSidebarOpen}
            textData={textData}
            onSave={handleTextSave}
          />
        );
      default:
        return null;
    }
  }

  // Multi-selection
  return (
    <MultiSelectionSidebar
      open={sidebarOpen}
      onOpenChange={setSidebarOpen}
      selectionType={selectionType}
      selectedCount={selectedCount}
      commonProperties={commonProperties}
      onBulkUpdate={handleBulkUpdate}
      onBulkDelete={handleBulkDelete}
      onBulkDuplicate={handleBulkDuplicate}
      onBulkLock={handleBulkLock}
      onBulkUnlock={handleBulkUnlock}
    />
  );
}
