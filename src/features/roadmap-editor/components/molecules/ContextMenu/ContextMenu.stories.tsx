import { Copy, Edit, Trash2, MoreVertical, Link, Download } from 'lucide-react';

import { ContextMenu } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Features/RoadmapEditor/Molecules/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="h-[400px] w-[600px] bg-slate-50 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: 'edit', label: '편집', icon: <Edit className="size-4" />, onClick: () => {} },
      { id: 'copy', label: '복사', icon: <Copy className="size-4" />, onClick: () => {} },
      { id: 'delete', label: '삭제', icon: <Trash2 className="size-4" />, onClick: () => {} },
    ],
    x: 100,
    y: 100,
    onClose: () => {},
  },
};

export const WithDividers: Story = {
  args: {
    items: [
      {
        id: 'edit',
        label: '편집',
        icon: <Edit className="size-4" />,
        onClick: () => {},
        divider: true,
      },
      {
        id: 'copy',
        label: '복사',
        icon: <Copy className="size-4" />,
        onClick: () => {},
        divider: true,
      },
      { id: 'delete', label: '삭제', icon: <Trash2 className="size-4" />, onClick: () => {} },
    ],
    x: 100,
    y: 100,
    onClose: () => {},
  },
};

export const WithDisabledItems: Story = {
  args: {
    items: [
      { id: 'edit', label: '편집', icon: <Edit className="size-4" />, onClick: () => {} },
      {
        id: 'copy',
        label: '복사',
        icon: <Copy className="size-4" />,
        onClick: () => {},
        disabled: true,
      },
      {
        id: 'delete',
        label: '삭제',
        icon: <Trash2 className="size-4" />,
        onClick: () => {},
        disabled: true,
      },
    ],
    x: 100,
    y: 100,
    onClose: () => {},
  },
};

export const WithoutIcons: Story = {
  args: {
    items: [
      { id: 'edit', label: '편집하기', onClick: () => {} },
      { id: 'copy', label: '복사하기', onClick: () => {} },
      { id: 'delete', label: '삭제하기', onClick: () => {} },
    ],
    x: 100,
    y: 100,
    onClose: () => {},
  },
};

export const LongMenu: Story = {
  args: {
    items: [
      { id: 'edit', label: '편집', icon: <Edit className="size-4" />, onClick: () => {} },
      { id: 'copy', label: '복사', icon: <Copy className="size-4" />, onClick: () => {} },
      {
        id: 'link',
        label: '링크 복사',
        icon: <Link className="size-4" />,
        onClick: () => {},
        divider: true,
      },
      {
        id: 'download',
        label: '다운로드',
        icon: <Download className="size-4" />,
        onClick: () => {},
      },
      {
        id: 'more',
        label: '더보기',
        icon: <MoreVertical className="size-4" />,
        onClick: () => {},
        divider: true,
      },
      { id: 'delete', label: '삭제', icon: <Trash2 className="size-4" />, onClick: () => {} },
    ],
    x: 100,
    y: 100,
    onClose: () => {},
  },
};

export const NodeContextMenu: Story = {
  args: {
    items: [
      { id: 'edit', label: '노드 편집', icon: <Edit className="size-4" />, onClick: () => {} },
      {
        id: 'copy',
        label: '노드 복사',
        icon: <Copy className="size-4" />,
        onClick: () => {},
        divider: true,
      },
      { id: 'delete', label: '노드 삭제', icon: <Trash2 className="size-4" />, onClick: () => {} },
    ],
    x: 150,
    y: 150,
    onClose: () => {},
  },
};
