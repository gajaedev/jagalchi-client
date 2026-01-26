import { useState } from 'react';

import { RoadmapAiModal } from '@/features/roadmap-editor/components/organisms/RoadmapAiModal';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Organisms/RoadmapAiModal',
  component: RoadmapAiModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RoadmapAiModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const InteractiveComponent = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary-500 text-neutral-0 rounded-md px-4 py-2 text-sm font-medium"
      >
        Open AI Modal
      </button>
      <RoadmapAiModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  render: InteractiveComponent,
};

const CreateTabComponent = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary-500 text-neutral-0 rounded-md px-4 py-2 text-sm font-medium"
      >
        Open AI Modal (Create)
      </button>
      <RoadmapAiModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const CreateTab: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  render: CreateTabComponent,
};

const EditTabComponent = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary-500 text-neutral-0 rounded-md px-4 py-2 text-sm font-medium"
      >
        Open AI Modal (Edit)
      </button>
      <RoadmapAiModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const EditTab: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
  render: EditTabComponent,
};
