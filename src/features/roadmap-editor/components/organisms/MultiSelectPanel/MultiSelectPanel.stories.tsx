import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { MultiSelectPanel } from '.';
import { nodesAtom } from '../../../stores/editor-atoms';

import type { JagalchiNodeType, RoadmapNode } from '../../../types/editor.types';

const meta = {
  title: 'Roadmap-Editor/Organisms/MultiSelectPanel',
  component: MultiSelectPanel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider>
        <div style={{ width: '240px', minHeight: '400px', border: '1px solid #e2e8f0' }}>
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof MultiSelectPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

function HydrateAtoms({
  initialNodes,
  children,
}: {
  initialNodes: RoadmapNode[];
  children: React.ReactNode;
}) {
  useHydrateAtoms([[nodesAtom, initialNodes]]);
  return <>{children}</>;
}

export const TwoNodesSelected: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: JagalchiNodeType[] = [
        {
          id: 'node-1',
          type: 'jagalchi-node',
          position: { x: 100, y: 100 },
          data: {
            label: 'Node 1',
            description: 'First node',
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
            description: 'Second node',
            variant: 'purple',
            resources: [],
            isLocked: false,
          },
          selected: true,
        },
      ];

      return (
        <Provider>
          <div style={{ width: '240px', minHeight: '400px', border: '1px solid #e2e8f0' }}>
            <HydrateAtoms initialNodes={sampleNodes}>
              <Story />
            </HydrateAtoms>
          </div>
        </Provider>
      );
    },
  ],
};

export const ThreeNodesSelected: Story = {
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
        {
          id: 'node-3',
          type: 'jagalchi-node',
          position: { x: 500, y: 100 },
          data: {
            label: 'Node 3',
            description: '',
            variant: 'red',
            resources: [],
            isLocked: false,
          },
          selected: true,
        },
      ];

      return (
        <Provider>
          <div style={{ width: '240px', minHeight: '400px', border: '1px solid #e2e8f0' }}>
            <HydrateAtoms initialNodes={sampleNodes}>
              <Story />
            </HydrateAtoms>
          </div>
        </Provider>
      );
    },
  ],
};

export const MixedTypes: Story = {
  decorators: [
    (Story) => {
      const sampleNodes: RoadmapNode[] = [
        {
          id: 'node-1',
          type: 'jagalchi-node',
          position: { x: 100, y: 100 },
          data: {
            label: 'Regular Node',
            description: '',
            variant: 'blue',
            resources: [],
            isLocked: false,
          },
          selected: true,
        },
        {
          id: 'section-1',
          type: 'jagalchi-section',
          position: { x: 50, y: 50 },
          data: {
            title: 'Section',
            variant: 'purple',
            isLocked: false,
          },
          selected: true,
          style: { width: 600, height: 400 },
        },
      ];

      return (
        <Provider>
          <div style={{ width: '240px', minHeight: '400px', border: '1px solid #e2e8f0' }}>
            <HydrateAtoms initialNodes={sampleNodes}>
              <Story />
            </HydrateAtoms>
          </div>
        </Provider>
      );
    },
  ],
};
