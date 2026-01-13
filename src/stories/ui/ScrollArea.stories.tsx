import type { Meta, StoryObj } from '@storybook/react';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export const Default: Story = {
  render: () => (
    <ScrollArea className="border-border h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="border-border w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted flex size-32 shrink-0 items-center justify-center rounded-md"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const WithContent: Story = {
  render: () => (
    <ScrollArea className="border-border h-[400px] w-[350px] rounded-md border p-4">
      <h4 className="mb-4 text-sm leading-none font-medium">Documentation</h4>
      <p className="text-muted-foreground mb-4 text-sm">
        The scroll area component is a custom scrollbar implementation that provides a consistent
        scrolling experience across different browsers and operating systems.
      </p>
      <h5 className="mb-2 text-sm font-medium">Features</h5>
      <ul className="text-muted-foreground mb-4 list-inside list-disc space-y-1 text-sm">
        <li>Consistent scrollbar styling across browsers</li>
        <li>Customizable scrollbar appearance</li>
        <li>Smooth scrolling behavior</li>
        <li>Support for both vertical and horizontal scrolling</li>
        <li>Keyboard navigation support</li>
        <li>Touch and mouse wheel support</li>
      </ul>
      <h5 className="mb-2 text-sm font-medium">Usage</h5>
      <p className="text-muted-foreground mb-4 text-sm">
        To use the scroll area component, wrap your content with the ScrollArea component. The
        component will automatically add scrollbars when the content overflows.
      </p>
      <p className="text-muted-foreground mb-4 text-sm">
        You can customize the appearance of the scrollbars by passing className props to the
        ScrollArea component or by modifying the global styles in your CSS file.
      </p>
      <h5 className="mb-2 text-sm font-medium">Accessibility</h5>
      <p className="text-muted-foreground text-sm">
        The scroll area component is built with accessibility in mind. It supports keyboard
        navigation using arrow keys, page up/down, home, and end keys. Screen readers will announce
        the scrollable region appropriately.
      </p>
    </ScrollArea>
  ),
};

export const CustomHeight: Story = {
  render: () => (
    <ScrollArea className="border-border h-48 w-80 rounded-md border p-4">
      <h4 className="mb-4 text-sm leading-none font-medium">Recent Activity</h4>
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="mb-3">
          <div className="text-sm font-medium">Activity {i + 1}</div>
          <p className="text-muted-foreground text-xs">Description of activity {i + 1}</p>
        </div>
      ))}
    </ScrollArea>
  ),
};
