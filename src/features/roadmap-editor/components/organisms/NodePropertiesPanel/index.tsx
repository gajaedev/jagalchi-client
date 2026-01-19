'use client';

import { memo } from 'react';

import { useSetAtom } from 'jotai';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EDITOR_MESSAGES } from '@/constants/messages';

import { NODE_PRESET_COLORS } from '../../../constants/preset-colors';
import { nodesAtom } from '../../../stores/editor-atoms';
import { ColorSelector } from '../../molecules/ColorSelector';

import type { JagalchiNodeType, NodeColorVariant } from '../../../types/editor.types';

interface NodePropertiesPanelProps {
  node: JagalchiNodeType;
}

export const NodePropertiesPanel = memo(function NodePropertiesPanel({
  node,
}: NodePropertiesPanelProps) {
  const setNodes = useSetAtom(nodesAtom);

  const updateNode = (updates: Partial<JagalchiNodeType['data']>) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === node.id ? ({ ...n, data: { ...n.data, ...updates } } as JagalchiNodeType) : n,
      ),
    );
  };

  const handleResourceAdd = () => {
    updateNode({ resources: [...node.data.resources, ''] });
  };

  const handleResourceChange = (index: number, value: string) => {
    const newResources = [...node.data.resources];
    newResources[index] = value;
    updateNode({ resources: newResources });
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label htmlFor="node-label">{EDITOR_MESSAGES.SIDEBAR_NODE_NAME_LABEL}</Label>
        <Input
          id="node-label"
          value={node.data.label}
          onChange={(e) => updateNode({ label: e.target.value })}
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="node-desc">{EDITOR_MESSAGES.SIDEBAR_NODE_DESC_LABEL}</Label>
        <Textarea
          id="node-desc"
          value={node.data.description}
          onChange={(e) => updateNode({ description: e.target.value })}
          className="mt-1"
          rows={3}
        />
      </div>

      <ColorSelector
        type="node"
        nodeId={node.id}
        currentVariant={node.data.variant}
        presets={NODE_PRESET_COLORS}
        onPresetSelect={(variant) => updateNode({ variant: variant as NodeColorVariant })}
      />

      <div>
        <Label>{EDITOR_MESSAGES.SIDEBAR_RESOURCES_LABEL}</Label>
        <div className="mt-2 space-y-2">
          {node.data.resources.map((resource: string, index: number) => (
            <Input
              key={index}
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              placeholder="URL"
            />
          ))}
          <Button variant="outline" size="sm" onClick={handleResourceAdd} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            {EDITOR_MESSAGES.SIDEBAR_ADD_RESOURCE_BUTTON}
          </Button>
        </div>
      </div>
    </div>
  );
});
