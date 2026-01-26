import { EditorInput } from '@/features/roadmap-editor/components/atoms/EditorInput';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Atoms/EditorInput',
  component: EditorInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Title',
    placeholder: 'Enter title',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Node ID',
    value: 'node-123',
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Title',
    value: 'My Roadmap Node',
  },
};
