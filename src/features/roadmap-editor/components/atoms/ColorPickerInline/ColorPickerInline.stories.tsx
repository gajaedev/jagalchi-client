import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ColorPickerInline } from './index';

const meta = {
  title: 'Editor/Atoms/ColorPickerInline',
  component: ColorPickerInline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPickerInline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '#009689',
  },
  render: (args) => (
    <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
  ),
};

export const Blue: Story = {
  args: {
    value: '#155dfc',
  },
  render: (args) => (
    <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
  ),
};

export const Red: Story = {
  args: {
    value: '#ec003f',
  },
  render: (args) => (
    <div className="flex w-[208px]">
      <ColorPickerInline {...args} />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    value: '#009689',
  },
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [color, setColor] = useState('#009689');

    return (
      <div className="flex flex-col gap-4">
        <ColorPickerInline value={color} onChange={setColor} />
        <p className="text-sm text-slate-600">선택된 색상: {color}</p>
      </div>
    );
  },
};

export const WithFixedWidth: Story = {
  args: {
    value: '#009689',
  },
  render: () => (
    <div className="flex w-[208px]">
      <ColorPickerInline value="#009689" />
    </div>
  ),
};
