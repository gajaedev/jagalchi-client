import type { Meta, StoryObj } from '@storybook/react';
import { ReactFlowProvider } from '@xyflow/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { RoadmapCanvas } from '.';
import { edgesAtom, nodesAtom } from '../../../stores/editor-atoms';

import type { RoadmapNode } from '../../../types/editor.types';
import type { Edge } from '@xyflow/react';

const meta = {
  title: 'Roadmap-Editor/Organisms/RoadmapCanvas',
  component: RoadmapCanvas,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider>
        <ReactFlowProvider>
          <div style={{ width: '100vw', height: '100vh' }}>
            <Story />
          </div>
        </ReactFlowProvider>
      </Provider>
    ),
  ],
} satisfies Meta<typeof RoadmapCanvas>;

export default meta;
type Story = StoryObj<typeof meta>;

function HydrateAtoms({
  initialValues,
  children,
}: {
  initialValues: any[];
  children: React.ReactNode;
}) {
  useHydrateAtoms(initialValues as any);
  return <>{children}</>;
}

export const Empty: Story = {};

export const WithSingleNode: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: RoadmapNode[] = [
        {
          id: 'node-1',
          type: 'jagalchi-node',
          position: { x: 250, y: 200 },
          data: {
            label: 'Sample Node',
            description: 'This is a sample node',
            variant: 'blue',
            resources: [],
            isLocked: false,
          },
        },
      ];

      return (
        <Provider>
          <ReactFlowProvider>
            <div style={{ width: '100vw', height: '100vh' }}>
              <HydrateAtoms initialValues={[[nodesAtom, sampleNodes]]}>
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>
      );
    },
  ],
};

export const WithMultipleNodes: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: RoadmapNode[] = [
        {
          id: 'node-1',
          type: 'jagalchi-node',
          position: { x: 100, y: 100 },
          data: {
            label: 'Start',
            description: '',
            variant: 'blue',
            resources: [],
            isLocked: false,
          },
        },
        {
          id: 'node-2',
          type: 'jagalchi-node',
          position: { x: 400, y: 100 },
          data: {
            label: 'Middle',
            description: '',
            variant: 'purple',
            resources: [],
            isLocked: false,
          },
        },
        {
          id: 'node-3',
          type: 'jagalchi-node',
          position: { x: 700, y: 100 },
          data: {
            label: 'End',
            description: '',
            variant: 'red',
            resources: [],
            isLocked: false,
          },
        },
      ];

      return (
        <Provider>
          <ReactFlowProvider>
            <div style={{ width: '100vw', height: '100vh' }}>
              <HydrateAtoms initialValues={[[nodesAtom, sampleNodes]]}>
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>
      );
    },
  ],
};

export const WithConnectedNodes: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: RoadmapNode[] = [
        {
          id: 'node-1',
          type: 'jagalchi-node',
          position: { x: 100, y: 200 },
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
          position: { x: 400, y: 200 },
          data: {
            label: 'Node 2',
            description: '',
            variant: 'purple',
            resources: [],
            isLocked: false,
          },
        },
      ];

      const sampleEdges: Edge[] = [
        {
          id: 'edge-1',
          source: 'node-1',
          target: 'node-2',
          type: 'smoothstep',
        },
      ];

      return (
        <Provider>
          <ReactFlowProvider>
            <div style={{ width: '100vw', height: '100vh' }}>
              <HydrateAtoms
                initialValues={[
                  [nodesAtom, sampleNodes],
                  [edgesAtom, sampleEdges],
                ]}
              >
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>
      );
    },
  ],
};

export const WithSection: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: RoadmapNode[] = [
        {
          id: 'section-1',
          type: 'jagalchi-section',
          position: { x: 50, y: 50 },
          data: {
            title: 'Phase 1',
            variant: 'blue',
            isLocked: false,
          },
          style: { width: 600, height: 400 },
        },
        {
          id: 'node-1',
          type: 'jagalchi-node',
          position: { x: 100, y: 150 },
          data: {
            label: 'Task 1',
            description: '',
            variant: 'white',
            resources: [],
            isLocked: false,
          },
          parentId: 'section-1',
          extent: 'parent',
        },
        {
          id: 'node-2',
          type: 'jagalchi-node',
          position: { x: 350, y: 150 },
          data: {
            label: 'Task 2',
            description: '',
            variant: 'white',
            resources: [],
            isLocked: false,
          },
          parentId: 'section-1',
          extent: 'parent',
        },
      ];

      return (
        <Provider>
          <ReactFlowProvider>
            <div style={{ width: '100vw', height: '100vh' }}>
              <HydrateAtoms initialValues={[[nodesAtom, sampleNodes]]}>
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>
      );
    },
  ],
};

export const WithText: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: RoadmapNode[] = [
        {
          id: 'text-1',
          type: 'jagalchi-text',
          position: { x: 300, y: 200 },
          data: {
            content: 'Roadmap Title',
            variant: 'black',
            fontSize: 24,
            fontWeight: 'bold',
            isLocked: false,
          },
        },
      ];

      return (
        <Provider>
          <ReactFlowProvider>
            <div style={{ width: '100vw', height: '100vh' }}>
              <HydrateAtoms initialValues={[[nodesAtom, sampleNodes]]}>
                <Story />
              </HydrateAtoms>
            </div>
          </ReactFlowProvider>
        </Provider>
      );
    },
  ],
};
