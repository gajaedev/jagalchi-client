import type { Meta, StoryObj } from '@storybook/react';
import type { Edge } from '@xyflow/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { EditorSidebar } from '.';
import { nodesAtom, edgesAtom } from '../../../stores/editor-atoms';

import type { JagalchiNodeType } from '../../../types/editor.types';

type RoadmapEdge = Edge;

const meta = {
  title: 'Roadmap-Editor/Organisms/EditorSidebar',
  component: EditorSidebar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider>
        <div style={{ width: '240px', height: '600px', border: '1px solid #e2e8f0' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof EditorSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

function HydrateAtoms({
  initialNodes,
  initialEdges,
  children,
}: {
  initialNodes?: JagalchiNodeType[];
  initialEdges?: RoadmapEdge[];
  children: React.ReactNode;
}) {
  const initialValues: [typeof nodesAtom | typeof edgesAtom, any][] = [];
  if (initialNodes) initialValues.push([nodesAtom, initialNodes]);
  if (initialEdges) initialValues.push([edgesAtom, initialEdges]);
  useHydrateAtoms(initialValues as any);
  return <>{children}</>;
}

export const Empty: Story = {};

export const WithNodeSelected: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: JagalchiNodeType[] = [
        {
          id: 'node-1',
          type: 'jagalchi-node',
          position: { x: 100, y: 100 },
          data: {
            label: 'Sample Node',
            description: 'This is a sample node',
            variant: 'blue',
            resources: ['https://example.com'],
            isLocked: false,
          },
          selected: true,
        },
      ];

      return (
        <Provider>
          <div style={{ width: '240px', height: '600px', border: '1px solid #e2e8f0' }}>
            <HydrateAtoms initialNodes={sampleNodes}>
              <Story />
            </HydrateAtoms>
          </div>
        </Provider>
      );
    },
  ],
};

export const WithEdgeSelected: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: JagalchiNodeType[] = [
        {
          id: 'node-1',
          type: 'jagalchi-node',
          position: { x: 100, y: 100 },
          data: {
            label: 'Node 1',
            description: '',
            variant: 'blue',
            resources: [],
            isLocked: false,
          },
        },
        {
          id: 'node-2',
          type: 'jagalchi-node',
          position: { x: 300, y: 100 },
          data: {
            label: 'Node 2',
            description: '',
            variant: 'purple',
            resources: [],
            isLocked: false,
          },
        },
      ];

      const sampleEdges: RoadmapEdge[] = [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
          type: 'smoothstep',
          selected: true,
        },
      ];

      return (
        <Provider>
          <div style={{ width: '240px', height: '600px', border: '1px solid #e2e8f0' }}>
            <HydrateAtoms initialNodes={sampleNodes} initialEdges={sampleEdges}>
              <Story />
            </HydrateAtoms>
          </div>
        </Provider>
      );
    },
  ],
};

export const WithMultiSelect: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: JagalchiNodeType[] = [
        {
          id: 'node-1',
          type: 'jagalchi-node',
          position: { x: 100, y: 100 },
          data: {
            label: 'Node 1',
            description: '',
            variant: 'blue',
            resources: [],
            isLocked: false,
          },
          selected: true,
        },
        {
          id: 'node-2',
          type: 'jagalchi-node',
          position: { x: 300, y: 100 },
          data: {
            label: 'Node 2',
            description: '',
            variant: 'purple',
            resources: [],
            isLocked: false,
          },
          selected: true,
        },
      ];

      return (
        <Provider>
          <div style={{ width: '240px', height: '600px', border: '1px solid #e2e8f0' }}>
            <HydrateAtoms initialNodes={sampleNodes}>
              <Story />
            </HydrateAtoms>
          </div>
        </Provider>
      );
    },
  ],
};
