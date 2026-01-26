import type { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import { ColorPicker } from '.';
import { colorPickerTargetAtom, isColorPickerOpenAtom } from '../../../stores/editor-atoms';

const meta = {
  title: 'Roadmap-Editor/Molecules/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Provider>
        <Story />
      </Provider>
    ),
  ],
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

function HydrateAtoms({
  initialValues,
  children,
}: {
  initialValues: any[];
  children: React.ReactNode;
}) {
  useHydrateAtoms(initialValues as any);
  return <>{children}</>;
}

export const Closed: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [isColorPickerOpenAtom, false],
            [colorPickerTargetAtom, null],
          ]}
        >
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const OpenForNode: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [isColorPickerOpenAtom, true],
            [colorPickerTargetAtom, { type: 'node', nodeId: 'Node_1' }],
          ]}
        >
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const OpenForText: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [isColorPickerOpenAtom, true],
            [colorPickerTargetAtom, { type: 'text', nodeId: 'Text_1' }],
          ]}
        >
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const OpenWithBlueColor: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [isColorPickerOpenAtom, true],
            [colorPickerTargetAtom, { type: 'node', nodeId: 'Node_1' }],
          ]}
        >
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};

export const OpenWithRedColor: Story = {
  decorators: [
    (Story) => (
      <Provider>
        <HydrateAtoms
          initialValues={[
            [isColorPickerOpenAtom, true],
            [colorPickerTargetAtom, { type: 'node', nodeId: 'Node_2' }],
          ]}
        >
          <Story />
        </HydrateAtoms>
      </Provider>
    ),
  ],
};
