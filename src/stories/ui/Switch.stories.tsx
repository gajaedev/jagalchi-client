import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '@/components/ui/switch';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <label htmlFor="airplane-mode" className="text-sm font-medium">
        Airplane Mode
      </label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex items-start gap-3">
      <Switch id="marketing" className="mt-0.5" />
      <div className="flex flex-col gap-1">
        <label htmlFor="marketing" className="text-sm font-medium">
          Marketing Emails
        </label>
        <p className="text-muted-foreground text-sm">
          Receive emails about new products and features
        </p>
      </div>
    </div>
  ),
};
