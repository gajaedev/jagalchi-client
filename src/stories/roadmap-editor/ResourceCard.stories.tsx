import { ResourceCard } from '@/features/roadmap-editor/components/molecules/ResourceCard';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Molecules/ResourceCard',
  component: ResourceCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResourceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'React Official Documentation',
    url: 'https://react.dev',
    onAdd: () => alert('Resource added!'),
  },
};

export const WithoutAddButton: Story = {
  args: {
    title: 'React Official Documentation',
    url: 'https://react.dev',
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Complete Guide to React Hooks and Modern React Development Patterns',
    url: 'https://react.dev/learn/hooks',
    onAdd: () => alert('Resource added!'),
  },
};
