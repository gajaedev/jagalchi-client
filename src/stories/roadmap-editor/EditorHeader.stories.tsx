import { EditorHeader } from '@/features/roadmap-editor/components/organisms/EditorHeader';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Organisms/EditorHeader',
  component: EditorHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    zoomLevel: {
      control: { type: 'number', min: 10, max: 400, step: 10 },
    },
  },
} satisfies Meta<typeof EditorHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    zoomLevel: 100,
  },
};

export const Zoomed150: Story = {
  args: {
    zoomLevel: 150,
  },
};

export const Zoomed50: Story = {
  args: {
    zoomLevel: 50,
  },
};

export const WithCustomClass: Story = {
  args: {
    zoomLevel: 100,
    className: 'shadow-lg',
  },
};
