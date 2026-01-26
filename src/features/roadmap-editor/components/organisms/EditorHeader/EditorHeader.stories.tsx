import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { EditorHeader } from '.';
import { roadmapTitleAtom } from '../../../stores/editor-atoms';

// Mock next/navigation for Storybook
const mockedUseRouter = () => ({
  push: () => {},
  replace: () => {},
  prefetch: () => {},
});

const meta = {
  title: 'Roadmap-Editor/Organisms/EditorHeader',
  component: EditorHeader,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        push: mockedUseRouter,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
} satisfies Meta<typeof EditorHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

function HydrateAtoms({
  initialValues,
  children,
}: {
  initialValues: [typeof roadmapTitleAtom, any][];
  children: React.ReactNode;
}) {
  useHydrateAtoms(initialValues);
  return <>{children}</>;
}

export const Default: Story = {};

export const WithCustomTitle: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms initialValues={[[roadmapTitleAtom, 'My Custom Roadmap']]}>
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const LongTitle: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [
              roadmapTitleAtom,
              'This is a very long roadmap title that demonstrates text truncation',
            ],
          ]}
        >
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};
