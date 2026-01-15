import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlowSection } from './index';
import type { FlowSectionData } from '@/features/editor/types/editor.types';
import { EDITOR_MESSAGES } from '@/constants/messages';

describe('FlowSection', () => {
  const createMockData = (overrides?: Partial<FlowSectionData>): FlowSectionData => ({
    title: '빈 섹션',
    color: '#000000',
    locked: false,
    variant: 'white',
    state: 'default',
    ...overrides,
  });

  describe('렌더링', () => {
    it('섹션 제목을 렌더링한다', () => {
      const data = createMockData({ title: '테스트 섹션' });
      render(<FlowSection data={data} />);

      expect(screen.getByText('테스트 섹션')).toBeInTheDocument();
    });

    it('title이 없으면 기본 메시지를 렌더링한다', () => {
      const data = createMockData({ title: '' });
      render(<FlowSection data={data} />);

      expect(screen.getByText(EDITOR_MESSAGES.FLOW_SECTION_DEFAULT_TITLE)).toBeInTheDocument();
    });
  });

  describe('색상 Variants', () => {
    const variants = ['white', 'black', 'blue', 'purple', 'red', 'orange'] as const;

    it.each(variants)('%s variant를 default state로 렌더링한다', (variant) => {
      const data = createMockData({ variant, state: 'default' });
      render(<FlowSection data={data} />);

      expect(screen.getByText('빈 섹션')).toBeInTheDocument();
    });

    it.each(variants)('%s variant를 focus state로 렌더링한다', (variant) => {
      const data = createMockData({ variant, state: 'focus' });
      render(<FlowSection data={data} />);

      expect(screen.getByText('빈 섹션')).toBeInTheDocument();
    });
  });

  describe('Selected State', () => {
    it('selected가 true일 때 focus state를 적용한다', () => {
      const data = createMockData({ state: 'default' });
      const { container } = render(<FlowSection data={data} selected={true} />);

      // Focus state corner handles가 렌더링되는지 확인
      const handles = container.querySelectorAll('.border-blue-600');
      expect(handles.length).toBeGreaterThan(0);
    });

    it('selected가 false일 때 focus handles를 표시하지 않는다', () => {
      const data = createMockData({ state: 'default' });
      const { container } = render(<FlowSection data={data} selected={false} />);

      const handles = container.querySelectorAll('.border-blue-600');
      expect(handles.length).toBe(0);
    });
  });

  describe('구조', () => {
    it('200x200px 컨테이너를 렌더링한다', () => {
      const data = createMockData();
      const { container } = render(<FlowSection data={data} />);

      const containerElement = container.querySelector('.h-\\[200px\\]');
      expect(containerElement).toBeInTheDocument();
      expect(containerElement).toHaveClass('w-full');
    });
  });
});
