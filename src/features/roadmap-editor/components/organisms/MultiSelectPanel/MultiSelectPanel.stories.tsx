import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import type { ReactNode } from 'react';

import { MultiSelectPanel } from '.';
import { selectedNodeIdsAtom } from '../../../stores/editor-atoms';

import type { Meta, StoryObj } from '@storybook/react';

// Jotai v2에서 initialValues를 사용하기 위한 wrapper
function HydrateAtoms({
  initialValues,
  children,
}: {
  initialValues: Iterable<readonly [any, unknown]>;
  children: ReactNode;
}) {
  useHydrateAtoms(new Map(initialValues));
  return children;
}

const meta = {
  title: 'Features/RoadmapEditor/Organisms/MultiSelectPanel',
  component: MultiSelectPanel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelectPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TwoNodesSelected: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms initialValues={[[selectedNodeIdsAtom, ['node-1', 'node-2']] as const]}>
          <div className="flex h-screen justify-end">
            <aside className="h-full w-[272px] border-l bg-white">
              <Story />
            </aside>
          </div>
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const ThreeNodesSelected: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[[selectedNodeIdsAtom, ['node-1', 'node-2', 'node-3']] as const]}
        >
          <div className="flex h-screen justify-end">
            <aside className="h-full w-[272px] border-l bg-white">
              <Story />
            </aside>
          </div>
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const FiveNodesSelected: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={
            [[selectedNodeIdsAtom, ['node-1', 'node-2', 'node-3', 'node-4', 'node-5']]] as const
          }
        >
          <div className="flex h-screen justify-end">
            <aside className="h-full w-[272px] border-l bg-white">
              <Story />
            </aside>
          </div>
        </HydrateAtoms>
      </Provider>
    ),
  ],
};
