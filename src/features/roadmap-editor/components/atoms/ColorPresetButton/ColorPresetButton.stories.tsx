import type { Meta, StoryObj } from '@storybook/react';

import { ColorPresetButton } from './index';

const meta = {
  title: 'Editor/Atoms/ColorPresetButton',
  component: ColorPresetButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPresetButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Figma 디자인에 정의된 6개 프리셋 컬러
const PRESET_COLORS = {
  WHITE: '#ffffff',
  BLACK: '#000000',
  BLUE: '#155dfc',
  PURPLE: '#9810fa',
  RED: '#ec003f',
  ORANGE: '#e17100',
};

export const White: Story = {
  args: {
    color: PRESET_COLORS.WHITE,
    isSelected: false,
  },
};

export const Black: Story = {
  args: {
    color: PRESET_COLORS.BLACK,
    isSelected: false,
  },
};

export const Blue: Story = {
  args: {
    color: PRESET_COLORS.BLUE,
    isSelected: false,
  },
};

export const BlueSelected: Story = {
  args: {
    color: PRESET_COLORS.BLUE,
    isSelected: true,
  },
};

export const Purple: Story = {
  args: {
    color: PRESET_COLORS.PURPLE,
    isSelected: false,
  },
};

export const Red: Story = {
  args: {
    color: PRESET_COLORS.RED,
    isSelected: false,
  },
};

export const Orange: Story = {
  args: {
    color: PRESET_COLORS.ORANGE,
    isSelected: false,
  },
};

export const AllPresets: Story = {
  args: {
    color: PRESET_COLORS.WHITE,
    isSelected: false,
  },
  render: () => (
    <div className="flex w-[240px] gap-1">
      <ColorPresetButton color={PRESET_COLORS.WHITE} />
      <ColorPresetButton color={PRESET_COLORS.BLACK} />
      <ColorPresetButton color={PRESET_COLORS.BLUE} isSelected />
      <ColorPresetButton color={PRESET_COLORS.PURPLE} />
      <ColorPresetButton color={PRESET_COLORS.RED} />
      <ColorPresetButton color={PRESET_COLORS.ORANGE} />
    </div>
  ),
};
