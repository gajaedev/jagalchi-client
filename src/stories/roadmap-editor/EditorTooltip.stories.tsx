import { EditorTooltip } from '@/features/roadmap-editor/components/atoms/EditorTooltip';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Atoms/EditorTooltip',
  component: EditorTooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content',
    },
    delay: {
      control: 'number',
      description: 'Delay before showing tooltip (ms)',
      defaultValue: 500,
    },
    side: {
      control: 'radio',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Tooltip placement',
      defaultValue: 'top',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof EditorTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {
  args: {} as any,
  render: () => (
    <div className="flex h-[200px] items-center justify-center">
      <EditorTooltip content="This is a tooltip on top" side="top" delay={300}>
        <button className="bg-primary-500 rounded px-4 py-2 text-white">Hover me (Top)</button>
      </EditorTooltip>
    </div>
  ),
};

export const Right: Story = {
  args: {} as any,
  render: () => (
    <div className="flex h-[200px] items-center justify-center">
      <EditorTooltip content="This is a tooltip on right" side="right" delay={300}>
        <button className="bg-primary-500 rounded px-4 py-2 text-white">Hover me (Right)</button>
      </EditorTooltip>
    </div>
  ),
};

export const Bottom: Story = {
  args: {} as any,
  render: () => (
    <div className="flex h-[200px] items-center justify-center">
      <EditorTooltip content="This is a tooltip on bottom" side="bottom" delay={300}>
        <button className="bg-primary-500 rounded px-4 py-2 text-white">Hover me (Bottom)</button>
      </EditorTooltip>
    </div>
  ),
};

export const Left: Story = {
  args: {} as any,
  render: () => (
    <div className="flex h-[200px] items-center justify-center">
      <EditorTooltip content="This is a tooltip on left" side="left" delay={300}>
        <button className="bg-primary-500 rounded px-4 py-2 text-white">Hover me (Left)</button>
      </EditorTooltip>
    </div>
  ),
};

export const LongText: Story = {
  args: {} as any,
  render: () => (
    <div className="flex h-[200px] items-center justify-center">
      <EditorTooltip
        content="This is a very long tooltip text that exceeds the maximum width of 200px and should wrap to multiple lines"
        side="top"
        delay={300}
      >
        <button className="bg-primary-500 rounded px-4 py-2 text-white">Long text tooltip</button>
      </EditorTooltip>
    </div>
  ),
};

export const NoDelay: Story = {
  args: {} as any,
  render: () => (
    <div className="flex h-[200px] items-center justify-center">
      <EditorTooltip content="Instant tooltip (no delay)" side="top" delay={0}>
        <button className="bg-primary-500 rounded px-4 py-2 text-white">No delay</button>
      </EditorTooltip>
    </div>
  ),
};

export const KeyboardFocus: Story = {
  args: {} as any,
  render: () => (
    <div className="flex h-[200px] items-center justify-center">
      <EditorTooltip content="Tooltip appears on keyboard focus" side="top" delay={300}>
        <button className="bg-primary-500 rounded px-4 py-2 text-white">
          Tab to focus (Keyboard accessible)
        </button>
      </EditorTooltip>
    </div>
  ),
};
