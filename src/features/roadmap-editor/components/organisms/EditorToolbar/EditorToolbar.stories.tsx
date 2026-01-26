import type { Meta, StoryObj } from '@storybook/react';
import { ReactFlowProvider } from '@xyflow/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { EditorToolbar } from '.';
import { activeToolAtom } from '../../../stores/editor-atoms';

const meta = {
  title: 'Roadmap-Editor/Organisms/EditorToolbar',
  component: EditorToolbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider>
        <ReactFlowProvider>
          <div style={{ height: '600px', position: 'relative' }}>
            <Story />
          </div>
        </ReactFlowProvider>
      </Provider>
    ),
  ],
} satisfies Meta<typeof EditorToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

function HydrateAtoms({
  initialValues,
  children,
}: {
  initialValues: [typeof activeToolAtom, any][];
  children: React.ReactNode;
}) {
  useHydrateAtoms(initialValues);
  return <>{children}</>;
}

export const Default: Story = {};

export const NodeActive: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <ReactFlowProvider>
          <div style={{ height: '600px', position: 'relative' }}>
            <HydrateAtoms initialValues={[[activeToolAtom, 'node']]}>
              <Story />
            </HydrateAtoms>
          </div>
        </ReactFlowProvider>
      </Provider>
    ),
  ],
};

export const LineActive: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <ReactFlowProvider>
          <div style={{ height: '600px', position: 'relative' }}>
            <HydrateAtoms initialValues={[[activeToolAtom, 'line']]}>
              <Story />
            </HydrateAtoms>
          </div>
        </ReactFlowProvider>
      </Provider>
    ),
  ],
};

export const SectionActive: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <ReactFlowProvider>
          <div style={{ height: '600px', position: 'relative' }}>
            <HydrateAtoms initialValues={[[activeToolAtom, 'section']]}>
              <Story />
            </HydrateAtoms>
          </div>
        </ReactFlowProvider>
      </Provider>
    ),
  ],
};

export const TextActive: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <ReactFlowProvider>
          <div style={{ height: '600px', position: 'relative' }}>
            <HydrateAtoms initialValues={[[activeToolAtom, 'text']]}>
              <Story />
            </HydrateAtoms>
          </div>
        </ReactFlowProvider>
      </Provider>
    ),
  ],
};
