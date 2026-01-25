import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ColorPicker } from './index';

const meta = {
  title: 'Editor/Atoms/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '#009689',
  },
};

export const Blue: Story = {
  args: {
    value: '#155dfc',
  },
};

export const Red: Story = {
  args: {
    value: '#ec003f',
  },
};

export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [color, setColor] = useState('#009689');

    return (
      <div className="flex flex-col gap-4">
        <ColorPicker value={color} onChange={setColor} />
        <p className="text-sm text-slate-600">선택된 색상: {color}</p>
      </div>
    );
  },
};

export const WithFixedWidth: Story = {
  render: () => (
    <div className="w-[208px]">
      <ColorPicker value="#009689" />
    </div>
  ),
};
