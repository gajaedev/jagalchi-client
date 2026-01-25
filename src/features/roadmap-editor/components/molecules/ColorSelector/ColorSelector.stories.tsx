import { Provider } from 'jotai';
import { useState } from 'react';

import { ColorSelector } from './index';

import type { Meta, StoryObj } from '@storybook/react';
import type { NodeColorVariant, TextColorVariant } from '../../../types/editor.types';

const meta = {
  title: 'Features/RoadmapEditor/Molecules/ColorSelector',
  component: ColorSelector,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider>
        <div className="w-[300px]">
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof ColorSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

const nodeColorPresets = [
  { variant: 'white' as NodeColorVariant, hex: '#ffffff', label: 'White' },
  { variant: 'black' as NodeColorVariant, hex: '#000000', label: 'Black' },
  { variant: 'blue' as NodeColorVariant, hex: '#155dfc', label: 'Blue' },
  { variant: 'purple' as NodeColorVariant, hex: '#9810fa', label: 'Purple' },
  { variant: 'red' as NodeColorVariant, hex: '#ec003f', label: 'Red' },
  { variant: 'orange' as NodeColorVariant, hex: '#e17100', label: 'Orange' },
];

const textColorPresets = [
  { variant: 'gray' as TextColorVariant, hex: '#64748b', label: 'Gray' },
  { variant: 'black' as TextColorVariant, hex: '#000000', label: 'Black' },
  { variant: 'blue' as TextColorVariant, hex: '#155dfc', label: 'Blue' },
  { variant: 'purple' as TextColorVariant, hex: '#9810fa', label: 'Purple' },
  { variant: 'red' as TextColorVariant, hex: '#ec003f', label: 'Red' },
  { variant: 'orange' as TextColorVariant, hex: '#e17100', label: 'Orange' },
];

// Default story - Node type with blue preset selected
export const Default: Story = {
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'blue',
    presets: nodeColorPresets,
    onPresetSelect: (variant) => console.log('Selected preset:', variant),
  },
};

// Node type with white preset selected
export const NodeWhite: Story = {
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'white',
    presets: nodeColorPresets,
    onPresetSelect: (variant) => console.log('Selected preset:', variant),
  },
};

// Node type with black preset selected
export const NodeBlack: Story = {
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'black',
    presets: nodeColorPresets,
    onPresetSelect: (variant) => console.log('Selected preset:', variant),
  },
};

// Node type with purple preset selected
export const NodePurple: Story = {
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'purple',
    presets: nodeColorPresets,
    onPresetSelect: (variant) => console.log('Selected preset:', variant),
  },
};

// Text type with gray preset selected
export const TextGray: Story = {
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'gray',
    presets: textColorPresets,
    onPresetSelect: (variant) => console.log('Selected preset:', variant),
  },
};

// Text type with red preset selected
export const TextRed: Story = {
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'red',
    presets: textColorPresets,
    onPresetSelect: (variant) => console.log('Selected preset:', variant),
  },
};

// Interactive story component - allows selecting presets dynamically
function InteractiveColorSelector(args: React.ComponentProps<typeof ColorSelector>) {
  const [currentVariant, setCurrentVariant] = useState<NodeColorVariant>('blue');

  return (
    <ColorSelector
      {...args}
      currentVariant={currentVariant}
      onPresetSelect={(variant) => {
        setCurrentVariant(variant as NodeColorVariant);
        console.log('Selected preset:', variant);
      }}
    />
  );
}

// Interactive story
export const Interactive: Story = {
  render: (args) => <InteractiveColorSelector {...args} />,
  args: {
    type: 'node',
    nodeId: 'node-1',
    currentVariant: 'blue',
    presets: nodeColorPresets,
    onPresetSelect: (variant) => console.log('Selected preset:', variant),
  },
};

// Interactive story component for text type
function InteractiveTextColorSelector(args: React.ComponentProps<typeof ColorSelector>) {
  const [currentVariant, setCurrentVariant] = useState<TextColorVariant>('gray');

  return (
    <ColorSelector
      {...args}
      currentVariant={currentVariant}
      onPresetSelect={(variant) => {
        setCurrentVariant(variant as TextColorVariant);
        console.log('Selected preset:', variant);
      }}
    />
  );
}

// Interactive story for text type
export const InteractiveText: Story = {
  render: (args) => <InteractiveTextColorSelector {...args} />,
  args: {
    type: 'text',
    nodeId: 'text-1',
    currentVariant: 'gray',
    presets: textColorPresets,
    onPresetSelect: (variant) => console.log('Selected preset:', variant),
  },
};
