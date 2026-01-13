import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-80">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Radix Primitives</h4>
        <p className="text-muted-foreground text-sm">An open-source UI component library.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4">
      <div>Item 1</div>
      <Separator orientation="vertical" />
      <div>Item 2</div>
      <Separator orientation="vertical" />
      <div>Item 3</div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-80">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium">Dashboard</h4>
          <p className="text-muted-foreground text-sm">View your dashboard and analytics</p>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-medium">Settings</h4>
          <p className="text-muted-foreground text-sm">Manage your account settings</p>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-medium">Profile</h4>
          <p className="text-muted-foreground text-sm">View and edit your profile</p>
        </div>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>Default separator</div>
      <Separator />
      <div>Primary colored separator</div>
      <Separator className="bg-primary" />
      <div>Destructive colored separator</div>
      <Separator className="bg-destructive" />
    </div>
  ),
};
