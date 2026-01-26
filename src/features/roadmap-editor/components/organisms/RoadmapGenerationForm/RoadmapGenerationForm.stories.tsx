import type { Meta, StoryObj } from '@storybook/react';

import { RoadmapGenerationForm } from '.';

const meta = {
  title: 'Organisms/RoadmapGenerationForm',
  component: RoadmapGenerationForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RoadmapGenerationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onGenerate: (prompt: string) => {
      console.log('Generate roadmap with prompt:', prompt);
    },
    onCancel: () => {
      console.log('Cancel generation');
    },
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
};
