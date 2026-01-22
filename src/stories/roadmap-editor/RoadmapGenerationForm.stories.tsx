import { RoadmapGenerationForm } from '@/features/roadmap-editor/components/molecules/RoadmapGenerationForm';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Molecules/RoadmapGenerationForm',
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
    onSubmit: (prompt: string) => alert(`Submitted: ${prompt}`),
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    onSubmit: (prompt: string) => alert(`Submitted: ${prompt}`),
  },
};
