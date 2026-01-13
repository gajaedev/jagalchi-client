import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from '@/components/ui/textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'This is a sample text in the textarea.',
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'This field has an error',
    'aria-invalid': true,
  },
};

export const CustomRows: Story = {
  args: {
    placeholder: 'This textarea has custom rows',
    rows: 10,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-2">
      <label htmlFor="message" className="text-sm font-medium">
        Your Message
      </label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
};
