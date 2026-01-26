import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { ResourceRecommendationModal } from '.';

const meta = {
  title: 'Organisms/ResourceRecommendationModal',
  component: ResourceRecommendationModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResourceRecommendationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

function DefaultWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Resource Modal</Button>
      <ResourceRecommendationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        nodeName="React"
      />
    </>
  );
}

function LongNodeNameWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Resource Modal</Button>
      <ResourceRecommendationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        nodeName="프론트엔드 웹 개발 기초부터 심화까지"
      />
    </>
  );
}

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    nodeName: 'React',
  },
  render: () => <DefaultWrapper />,
};

export const WithLongNodeName: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    nodeName: '프론트엔드 웹 개발 기초부터 심화까지',
  },
  render: () => <LongNodeNameWrapper />,
};
