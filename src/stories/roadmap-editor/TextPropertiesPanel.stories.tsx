import { useState } from 'react';

import { TextPropertiesPanel } from '@/features/roadmap-editor/components/organisms/TextPropertiesPanel';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Organisms/TextPropertiesPanel',
  component: TextPropertiesPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextPropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [content, setContent] = useState('Important milestone');
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState<'normal' | 'medium' | 'semibold' | 'bold'>('normal');
  const [color, setColor] = useState('#111827');

  return (
    <TextPropertiesPanel
      textId="text-1"
      content={content}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      onContentChange={setContent}
      onFontSizeChange={setFontSize}
      onFontWeightChange={setFontWeight}
      onColorChange={setColor}
    />
  );
};

export const Default: Story = {
  args: {
    textId: 'text-1',
    content: 'Important milestone',
    fontSize: 16,
    fontWeight: 'normal',
    color: '#111827',
    onContentChange: () => {},
    onFontSizeChange: () => {},
    onFontWeightChange: () => {},
    onColorChange: () => {},
  },
  render: DefaultComponent,
};

const BoldHeadingComponent = () => {
  const [content, setContent] = useState('Q1 Objectives');
  const [fontSize, setFontSize] = useState(24);
  const [fontWeight, setFontWeight] = useState<'normal' | 'medium' | 'semibold' | 'bold'>('bold');
  const [color, setColor] = useState('#111827');

  return (
    <TextPropertiesPanel
      textId="text-2"
      content={content}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      onContentChange={setContent}
      onFontSizeChange={setFontSize}
      onFontWeightChange={setFontWeight}
      onColorChange={setColor}
      onDelete={() => alert('Delete clicked')}
    />
  );
};

export const BoldHeading: Story = {
  args: {
    textId: 'text-2',
    content: 'Q1 Objectives',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    onContentChange: () => {},
    onFontSizeChange: () => {},
    onFontWeightChange: () => {},
    onColorChange: () => {},
    onDelete: () => {},
  },
  render: BoldHeadingComponent,
};

const SmallSubtextComponent = () => {
  const [content, setContent] = useState('Additional notes and context for this section');
  const [fontSize, setFontSize] = useState(12);
  const [fontWeight, setFontWeight] = useState<'normal' | 'medium' | 'semibold' | 'bold'>('normal');
  const [color, setColor] = useState('#6b7280');

  return (
    <TextPropertiesPanel
      textId="text-3"
      content={content}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      onContentChange={setContent}
      onFontSizeChange={setFontSize}
      onFontWeightChange={setFontWeight}
      onColorChange={setColor}
      onDelete={() => alert('Delete clicked')}
    />
  );
};

export const SmallSubtext: Story = {
  args: {
    textId: 'text-3',
    content: 'Additional notes and context for this section',
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6b7280',
    onContentChange: () => {},
    onFontSizeChange: () => {},
    onFontWeightChange: () => {},
    onColorChange: () => {},
    onDelete: () => {},
  },
  render: SmallSubtextComponent,
};

const LongContentComponent = () => {
  const [content, setContent] = useState(
    'This is a very long text content that demonstrates how the text properties panel handles long content. It should wrap properly and maintain readability even with extended text.',
  );
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState<'normal' | 'medium' | 'semibold' | 'bold'>('medium');
  const [color, setColor] = useState('#374151');

  return (
    <TextPropertiesPanel
      textId="text-4"
      content={content}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      onContentChange={setContent}
      onFontSizeChange={setFontSize}
      onFontWeightChange={setFontWeight}
      onColorChange={setColor}
    />
  );
};

export const LongContent: Story = {
  args: {
    textId: 'text-4',
    content:
      'This is a very long text content that demonstrates how the text properties panel handles long content. It should wrap properly and maintain readability even with extended text.',
    fontSize: 16,
    fontWeight: 'medium',
    color: '#374151',
    onContentChange: () => {},
    onFontSizeChange: () => {},
    onFontWeightChange: () => {},
    onColorChange: () => {},
  },
  render: LongContentComponent,
};
