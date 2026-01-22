import { useState } from 'react';

import { EditorCheckbox } from '@/features/roadmap-editor/components/atoms/EditorCheckbox';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Roadmap Editor/EditorCheckbox',
  component: EditorCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [checked, setChecked] = useState(false);

  return (
    <EditorCheckbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
  },
  render: DefaultComponent,
};

const IndeterminateComponent = () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    setIndeterminate(false);
  };

  return (
    <div className="space-y-4">
      <EditorCheckbox
        label="Select all items"
        checked={checked}
        indeterminate={indeterminate}
        onChange={handleChange}
      />
      <p className="text-sm text-neutral-700">
        {indeterminate ? 'Some items selected' : checked ? 'All selected' : 'None selected'}
      </p>
    </div>
  );
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all items',
    checked: false,
    indeterminate: true,
  },
  render: IndeterminateComponent,
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    checked: false,
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled (checked)',
    checked: true,
    disabled: true,
  },
};

export const WithoutLabel: Story = {
  args: {
    'aria-label': 'Checkbox without visible label',
    checked: false,
  },
};
