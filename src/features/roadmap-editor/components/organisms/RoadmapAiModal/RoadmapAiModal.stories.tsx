import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { RoadmapAiModal } from '.';

const meta = {
  title: 'Organisms/RoadmapAiModal',
  component: RoadmapAiModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RoadmapAiModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function GenerateModeWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Generate Modal</Button>
      <RoadmapAiModal isOpen={isOpen} onClose={() => setIsOpen(false)} mode="generate" />
    </>
  );
}

function ModifyModeWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modify Modal</Button>
      <RoadmapAiModal isOpen={isOpen} onClose={() => setIsOpen(false)} mode="modify" />
    </>
  );
}

export const GenerateMode: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'generate',
  },
  render: () => <GenerateModeWrapper />,
};

export const ModifyMode: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    mode: 'modify',
  },
  render: () => <ModifyModeWrapper />,
};
