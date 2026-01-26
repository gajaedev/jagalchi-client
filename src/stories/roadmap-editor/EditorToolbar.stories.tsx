import { EditorToolbar } from '@/features/roadmap-editor/components/organisms/EditorToolbar';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Organisms/EditorToolbar',
  component: EditorToolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SelectIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 3L17 3L17 17L3 17Z" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

const MoveIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3L10 17M3 10L17 10" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const DrawIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M3 17L17 3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const TextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <text x="5" y="15" fontSize="16" fontWeight="bold">
      T
    </text>
  </svg>
);

export const Default: Story = {
  args: {
    tools: [
      {
        id: 'select',
        icon: <SelectIcon />,
        label: 'Select tool',
        isActive: true,
      },
      {
        id: 'move',
        icon: <MoveIcon />,
        label: 'Move tool',
        isActive: false,
      },
      {
        id: 'draw',
        icon: <DrawIcon />,
        label: 'Draw tool',
        isActive: false,
      },
    ],
  },
};

export const WithDivider: Story = {
  args: {
    tools: [
      {
        id: 'select',
        icon: <SelectIcon />,
        label: 'Select tool',
        isActive: true,
      },
      {
        id: 'move',
        icon: <MoveIcon />,
        label: 'Move tool',
        isActive: false,
      },
      {
        id: 'divider',
        icon: null,
        label: '',
      },
      {
        id: 'draw',
        icon: <DrawIcon />,
        label: 'Draw tool',
        isActive: false,
      },
      {
        id: 'text',
        icon: <TextIcon />,
        label: 'Text tool',
        isActive: false,
      },
    ],
  },
};

export const MultipleDividers: Story = {
  args: {
    tools: [
      {
        id: 'select',
        icon: <SelectIcon />,
        label: 'Select tool',
        isActive: true,
      },
      {
        id: 'divider-1',
        icon: null,
        label: '',
      },
      {
        id: 'move',
        icon: <MoveIcon />,
        label: 'Move tool',
        isActive: false,
      },
      {
        id: 'draw',
        icon: <DrawIcon />,
        label: 'Draw tool',
        isActive: false,
      },
      {
        id: 'divider-2',
        icon: null,
        label: '',
      },
      {
        id: 'text',
        icon: <TextIcon />,
        label: 'Text tool',
        isActive: false,
      },
    ],
  },
};

export const FullHeight: Story = {
  args: {
    tools: [
      {
        id: 'select',
        icon: <SelectIcon />,
        label: 'Select tool',
        isActive: true,
      },
      {
        id: 'move',
        icon: <MoveIcon />,
        label: 'Move tool',
        isActive: false,
      },
      {
        id: 'divider',
        icon: null,
        label: '',
      },
      {
        id: 'draw',
        icon: <DrawIcon />,
        label: 'Draw tool',
        isActive: false,
      },
      {
        id: 'text',
        icon: <TextIcon />,
        label: 'Text tool',
        isActive: false,
      },
    ],
  },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="flex h-screen">
        <Story />
        <div className="flex-1 bg-neutral-50 p-8">
          <p className="text-neutral-700">Editor content area</p>
        </div>
      </div>
    ),
  ],
};
