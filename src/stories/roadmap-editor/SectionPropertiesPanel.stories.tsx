import { useState } from 'react';

import { SectionPropertiesPanel } from '@/features/roadmap-editor/components/organisms/SectionPropertiesPanel';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Organisms/SectionPropertiesPanel',
  component: SectionPropertiesPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SectionPropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [title, setTitle] = useState('Q1 2025');
  const [backgroundColor, setBackgroundColor] = useState('#3b82f6');
  const [borderColor, setBorderColor] = useState('#2563eb');

  return (
    <SectionPropertiesPanel
      sectionId="section-1"
      title={title}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      onTitleChange={setTitle}
      onBackgroundColorChange={setBackgroundColor}
      onBorderColorChange={setBorderColor}
    />
  );
};

export const Default: Story = {
  args: {
    sectionId: 'section-1',
    title: 'Q1 2025',
    backgroundColor: '#3b82f6',
    borderColor: '#2563eb',
    onTitleChange: () => {},
    onBackgroundColorChange: () => {},
    onBorderColorChange: () => {},
  },
  render: DefaultComponent,
};

const WithDeleteComponent = () => {
  const [title, setTitle] = useState('Q2 2025');
  const [backgroundColor, setBackgroundColor] = useState('#10b981');
  const [borderColor, setBorderColor] = useState('#059669');

  return (
    <SectionPropertiesPanel
      sectionId="section-2"
      title={title}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      onTitleChange={setTitle}
      onBackgroundColorChange={setBackgroundColor}
      onBorderColorChange={setBorderColor}
      onDelete={() => alert('Delete clicked')}
    />
  );
};

export const WithDelete: Story = {
  args: {
    sectionId: 'section-2',
    title: 'Q2 2025',
    backgroundColor: '#10b981',
    borderColor: '#059669',
    onTitleChange: () => {},
    onBackgroundColorChange: () => {},
    onBorderColorChange: () => {},
    onDelete: () => {},
  },
  render: WithDeleteComponent,
};

const LongTitleComponent = () => {
  const [title, setTitle] = useState('Very Long Section Title That Might Overflow');
  const [backgroundColor, setBackgroundColor] = useState('#f59e0b');
  const [borderColor, setBorderColor] = useState('#d97706');

  return (
    <SectionPropertiesPanel
      sectionId="section-3"
      title={title}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      onTitleChange={setTitle}
      onBackgroundColorChange={setBackgroundColor}
      onBorderColorChange={setBorderColor}
    />
  );
};

export const LongTitle: Story = {
  args: {
    sectionId: 'section-3',
    title: 'Very Long Section Title That Might Overflow',
    backgroundColor: '#f59e0b',
    borderColor: '#d97706',
    onTitleChange: () => {},
    onBackgroundColorChange: () => {},
    onBorderColorChange: () => {},
  },
  render: LongTitleComponent,
};
