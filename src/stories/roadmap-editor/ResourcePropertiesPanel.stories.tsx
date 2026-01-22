import { useState } from 'react';

import { ResourcePropertiesPanel } from '@/features/roadmap-editor/components/organisms/ResourcePropertiesPanel';

import type { Meta, StoryObj } from '@storybook/react';

interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'article' | 'video' | 'course' | 'book' | 'other';
}

const meta = {
  title: 'Roadmap Editor/Organisms/ResourcePropertiesPanel',
  component: ResourcePropertiesPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResourcePropertiesPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultComponent = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'resource-1',
      title: 'React Official Docs',
      url: 'https://react.dev',
      type: 'article',
    },
    {
      id: 'resource-2',
      title: 'React Tutorial by Fireship',
      url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
      type: 'video',
    },
  ]);

  return (
    <ResourcePropertiesPanel
      nodeId="node-1"
      resources={resources}
      onResourceAdd={() => {
        const newResource: Resource = {
          id: `resource-${Date.now()}`,
          title: 'New Resource',
          url: 'https://example.com',
          type: 'article',
        };
        setResources([...resources, newResource]);
      }}
      onResourceUpdate={(resourceId, updates) => {
        setResources(resources.map((r) => (r.id === resourceId ? { ...r, ...updates } : r)));
      }}
      onResourceDelete={(resourceId) => {
        setResources(resources.filter((r) => r.id !== resourceId));
      }}
    />
  );
};

export const Default: Story = {
  args: {
    nodeId: 'node-1',
    resources: [
      {
        id: 'resource-1',
        title: 'React Official Docs',
        url: 'https://react.dev',
        type: 'article',
      },
      {
        id: 'resource-2',
        title: 'React Tutorial by Fireship',
        url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
        type: 'video',
      },
    ],
    onResourceAdd: () => {},
    onResourceUpdate: () => {},
    onResourceDelete: () => {},
  },
  render: DefaultComponent,
};

const EmptyComponent = () => {
  const [resources, setResources] = useState<Resource[]>([]);

  return (
    <ResourcePropertiesPanel
      nodeId="node-2"
      resources={resources}
      onResourceAdd={() => {
        const newResource: Resource = {
          id: `resource-${Date.now()}`,
          title: 'New Resource',
          url: 'https://example.com',
          type: 'article',
        };
        setResources([...resources, newResource]);
      }}
      onResourceUpdate={(resourceId, updates) => {
        setResources(resources.map((r) => (r.id === resourceId ? { ...r, ...updates } : r)));
      }}
      onResourceDelete={(resourceId) => {
        setResources(resources.filter((r) => r.id !== resourceId));
      }}
    />
  );
};

export const Empty: Story = {
  args: {
    nodeId: 'node-2',
    resources: [],
    onResourceAdd: () => {},
    onResourceUpdate: () => {},
    onResourceDelete: () => {},
  },
  render: EmptyComponent,
};

const ManyResourcesComponent = () => {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'resource-1',
      title: 'React Official Docs',
      url: 'https://react.dev',
      type: 'article',
    },
    {
      id: 'resource-2',
      title: 'React Tutorial',
      url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
      type: 'video',
    },
    {
      id: 'resource-3',
      title: 'Complete React Course',
      url: 'https://www.udemy.com/course/react-the-complete-guide',
      type: 'course',
    },
    {
      id: 'resource-4',
      title: 'Learning React Book',
      url: 'https://www.oreilly.com/library/view/learning-react/9781492051718/',
      type: 'book',
    },
    {
      id: 'resource-5',
      title: 'React GitHub Repository',
      url: 'https://github.com/facebook/react',
      type: 'other',
    },
  ]);

  return (
    <ResourcePropertiesPanel
      nodeId="node-3"
      resources={resources}
      onResourceAdd={() => {
        const newResource: Resource = {
          id: `resource-${Date.now()}`,
          title: 'New Resource',
          url: 'https://example.com',
          type: 'article',
        };
        setResources([...resources, newResource]);
      }}
      onResourceUpdate={(resourceId, updates) => {
        setResources(resources.map((r) => (r.id === resourceId ? { ...r, ...updates } : r)));
      }}
      onResourceDelete={(resourceId) => {
        setResources(resources.filter((r) => r.id !== resourceId));
      }}
    />
  );
};

export const ManyResources: Story = {
  args: {
    nodeId: 'node-3',
    resources: [
      {
        id: 'resource-1',
        title: 'React Official Docs',
        url: 'https://react.dev',
        type: 'article',
      },
      {
        id: 'resource-2',
        title: 'React Tutorial',
        url: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM',
        type: 'video',
      },
      {
        id: 'resource-3',
        title: 'Complete React Course',
        url: 'https://www.udemy.com/course/react-the-complete-guide',
        type: 'course',
      },
      {
        id: 'resource-4',
        title: 'Learning React Book',
        url: 'https://www.oreilly.com/library/view/learning-react/9781492051718/',
        type: 'book',
      },
      {
        id: 'resource-5',
        title: 'React GitHub Repository',
        url: 'https://github.com/facebook/react',
        type: 'other',
      },
    ],
    onResourceAdd: () => {},
    onResourceUpdate: () => {},
    onResourceDelete: () => {},
  },
  render: ManyResourcesComponent,
};
