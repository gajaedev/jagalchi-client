import { EditorInput } from '../../atoms/EditorInput';
import { EditorResource } from '../EditorResource';
import { CollapseSection } from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Features/RoadmapEditor/Molecules/CollapseSection',
  component: CollapseSection,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CollapseSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '첨부 자료',
    children: (
      <>
        <EditorInput label="" value="" onChange={() => {}} placeholder="자료 링크 입력" />
        <EditorInput label="" value="" onChange={() => {}} placeholder="자료 링크 입력" />
      </>
    ),
  },
};

export const Closed: Story = {
  args: {
    title: '첨부 자료',
    defaultOpen: false,
    children: (
      <>
        <EditorInput label="" value="" onChange={() => {}} placeholder="자료 링크 입력" />
      </>
    ),
  },
};

export const WithResources: Story = {
  args: {
    title: '자료 목록',
    children: (
      <>
        <EditorResource title="ResourceSite.com/Resource1" url="https://example.com/1" />
        <EditorResource title="LibertsDelay.stop.com" url="https://example.com/2" />
        <EditorResource title="Justin'sVelog.velog.io" url="https://velog.io/@justin" />
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: '상세 정보',
    children: (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-slate-700">
          이 섹션에는 많은 내용이 들어있습니다. 접기/펼치기 기능을 통해 필요할 때만 볼 수 있습니다.
        </p>
        <EditorInput label="항목 1" value="" onChange={() => {}} />
        <EditorInput label="항목 2" value="" onChange={() => {}} />
        <EditorInput label="항목 3" value="" onChange={() => {}} />
      </div>
    ),
  },
};
