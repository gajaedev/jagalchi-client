import { EditorResource } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Features/RoadmapEditor/Molecules/EditorResource',
  component: EditorResource,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EditorResource>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'ResourceSite.com/Resource1',
    url: 'https://resourcesite.com/resource1',
  },
};

export const Short: Story = {
  args: {
    title: 'Example',
    url: 'https://example.com',
  },
};

export const LongTitle: Story = {
  args: {
    title: "Justin'sVelog.velog.fejwnajwaf.com/very/long/path/to/resource",
    url: 'https://velog.io/@justin',
  },
};

export const CustomClick: Story = {
  args: {
    title: 'Click Handler Test',
    url: 'https://example.com',
    onClick: () => alert('Custom click handler!'),
  },
};

export const Multiple = {
  render: () => (
    <div className="flex flex-col gap-2">
      <EditorResource title="ResourceSite.com/Resource1" url="https://example.com/1" />
      <EditorResource title="LibertsDelay.stoooopppppppp.com" url="https://example.com/2" />
      <EditorResource title="Justin'sVelog.velog.io" url="https://velog.io/@justin" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '여러 자료를 함께 표시하는 예시',
      },
    },
  },
};
