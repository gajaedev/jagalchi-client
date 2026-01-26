import { EditorDivider } from '@/features/roadmap-editor/components/atoms/EditorDivider';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Atoms/EditorDivider',
  component: EditorDivider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
      defaultValue: 'horizontal',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
  },
} satisfies Meta<typeof EditorDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <div className="bg-neutral-50 p-4">Content above divider</div>
        <Story />
        <div className="bg-neutral-50 p-4">Content below divider</div>
      </div>
    ),
  ],
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="flex h-[200px]">
        <div className="bg-neutral-50 p-4">Left content</div>
        <Story />
        <div className="bg-neutral-50 p-4">Right content</div>
      </div>
    ),
  ],
};

export const WithAriaLabel: Story = {
  args: {
    orientation: 'horizontal',
    'aria-label': 'Section separator',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <div className="bg-neutral-50 p-4">Section 1</div>
        <Story />
        <div className="bg-neutral-50 p-4">Section 2</div>
      </div>
    ),
  ],
};

export const CustomClassName: Story = {
  args: {
    orientation: 'horizontal',
    className: 'bg-primary-500',
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <div className="bg-neutral-50 p-4">Custom colored divider below</div>
        <Story />
        <div className="bg-neutral-50 p-4">Custom colored divider above</div>
      </div>
    ),
  ],
};
