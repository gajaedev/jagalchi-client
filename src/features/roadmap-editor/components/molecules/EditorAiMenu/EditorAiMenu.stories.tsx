import type { Meta, StoryObj } from '@storybook/react';

import { EditorAiMenu } from '.';

const meta = {
  title: 'Roadmap-Editor/Molecules/EditorAiMenu',
  component: EditorAiMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorAiMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithOpenMenu: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Click the gear icon to see the AI menu options',
      },
    },
  },
};
