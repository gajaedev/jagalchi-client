import type { Meta, StoryObj } from '@storybook/react';
import { Copy, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { ContextMenu } from '@/features/roadmap-editor/components/molecules/ContextMenu';

const meta = {
  title: 'Roadmap Editor/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [position] = useState({ x: 100, y: 100 });

  return (
    <div className="relative h-[400px] w-[600px]">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-neutral-100 px-4 py-2 text-sm"
      >
        Open Context Menu
      </button>
      <ContextMenu
        isOpen={isOpen}
        position={position}
        items={[
          { id: '1', label: 'Edit', onClick: () => console.log('Edit clicked') },
          { id: '2', label: 'Duplicate', onClick: () => console.log('Duplicate clicked') },
          { id: '3', label: 'Delete', onClick: () => console.log('Delete clicked') },
        ]}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    isOpen: true,
    position: { x: 100, y: 100 },
    items: [
      { id: '1', label: 'Edit', onClick: () => {} },
      { id: '2', label: 'Duplicate', onClick: () => {} },
      { id: '3', label: 'Delete', onClick: () => {} },
    ],
    onClose: () => {},
  },
  render: DefaultComponent,
};

const WithIconsComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [position] = useState({ x: 100, y: 100 });

  return (
    <div className="relative h-[400px] w-[600px]">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-neutral-100 px-4 py-2 text-sm"
      >
        Open Context Menu with Icons
      </button>
      <ContextMenu
        isOpen={isOpen}
        position={position}
        items={[
          {
            id: '1',
            label: 'Edit',
            icon: <Edit className="h-4 w-4" />,
            onClick: () => console.log('Edit clicked'),
          },
          {
            id: '2',
            label: 'Duplicate',
            icon: <Copy className="h-4 w-4" />,
            onClick: () => console.log('Duplicate clicked'),
          },
          {
            id: '3',
            label: 'Delete',
            icon: <Trash2 className="h-4 w-4" />,
            onClick: () => console.log('Delete clicked'),
          },
        ]}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export const WithIcons: Story = {
  args: {
    isOpen: true,
    position: { x: 100, y: 100 },
    items: [
      { id: '1', label: 'Edit', icon: <Edit className="h-4 w-4" />, onClick: () => {} },
      { id: '2', label: 'Duplicate', icon: <Copy className="h-4 w-4" />, onClick: () => {} },
      { id: '3', label: 'Delete', icon: <Trash2 className="h-4 w-4" />, onClick: () => {} },
    ],
    onClose: () => {},
  },
  render: WithIconsComponent,
};

const WithDisabledComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [position] = useState({ x: 100, y: 100 });

  return (
    <div className="relative h-[400px] w-[600px]">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-neutral-100 px-4 py-2 text-sm"
      >
        Open Context Menu with Disabled Items
      </button>
      <ContextMenu
        isOpen={isOpen}
        position={position}
        items={[
          { id: '1', label: 'Edit', onClick: () => console.log('Edit clicked') },
          {
            id: '2',
            label: 'Duplicate',
            onClick: () => console.log('Duplicate clicked'),
            disabled: true,
          },
          { id: '3', label: 'Delete', onClick: () => console.log('Delete clicked') },
        ]}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export const WithDisabledItems: Story = {
  args: {
    isOpen: true,
    position: { x: 100, y: 100 },
    items: [
      { id: '1', label: 'Edit', onClick: () => {} },
      { id: '2', label: 'Duplicate', onClick: () => {}, disabled: true },
      { id: '3', label: 'Delete', onClick: () => {} },
    ],
    onClose: () => {},
  },
  render: WithDisabledComponent,
};

const WithSeparatorComponent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [position] = useState({ x: 100, y: 100 });

  return (
    <div className="relative h-[400px] w-[600px]">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-neutral-100 px-4 py-2 text-sm"
      >
        Open Context Menu with Separators
      </button>
      <ContextMenu
        isOpen={isOpen}
        position={position}
        items={[
          {
            id: '1',
            label: 'Edit',
            icon: <Edit className="h-4 w-4" />,
            onClick: () => console.log('Edit clicked'),
          },
          {
            id: '2',
            label: 'Duplicate',
            icon: <Copy className="h-4 w-4" />,
            onClick: () => console.log('Duplicate clicked'),
          },
          { id: 'sep1', label: '', onClick: () => {}, separator: true },
          {
            id: '3',
            label: 'Delete',
            icon: <Trash2 className="h-4 w-4" />,
            onClick: () => console.log('Delete clicked'),
          },
        ]}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export const WithSeparators: Story = {
  args: {
    isOpen: true,
    position: { x: 100, y: 100 },
    items: [
      { id: '1', label: 'Edit', icon: <Edit className="h-4 w-4" />, onClick: () => {} },
      { id: '2', label: 'Duplicate', icon: <Copy className="h-4 w-4" />, onClick: () => {} },
      { id: 'sep1', label: '', onClick: () => {}, separator: true },
      { id: '3', label: 'Delete', icon: <Trash2 className="h-4 w-4" />, onClick: () => {} },
    ],
    onClose: () => {},
  },
  render: WithSeparatorComponent,
};
