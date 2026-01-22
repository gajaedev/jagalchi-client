import { useState } from 'react';

import { ColorPicker } from '@/features/roadmap-editor/components/atoms/ColorPicker';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/Atoms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [color, setColor] = useState('#3b82f6');
  return <ColorPicker value={color} onChange={setColor} />;
};

export const Default: Story = {
  args: { value: '#3b82f6', onChange: () => {} },
  render: DefaultComponent,
};

const WithLabelComponent = () => {
  const [color, setColor] = useState('#10b981');
  return <ColorPicker label="Background Color" value={color} onChange={setColor} />;
};

export const WithLabel: Story = {
  args: { label: 'Background Color', value: '#10b981', onChange: () => {} },
  render: WithLabelComponent,
};

const WithRecentColorsComponent = () => {
  const [color, setColor] = useState('#ef4444');
  const recentColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  return (
    <ColorPicker label="Pick Color" value={color} onChange={setColor} recentColors={recentColors} />
  );
};

export const WithRecentColors: Story = {
  args: { label: 'Pick Color', value: '#ef4444', onChange: () => {}, recentColors: [] },
  render: WithRecentColorsComponent,
};
