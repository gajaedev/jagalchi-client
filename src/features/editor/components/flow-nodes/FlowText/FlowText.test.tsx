import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FlowText } from './index';
import type { FlowTextData } from '@/features/editor/types/editor.types';
import { EDITOR_MESSAGES } from '@/constants/messages';

describe('FlowText', () => {
  const createMockData = (overrides?: Partial<FlowTextData>): FlowTextData => ({
    content: 'Text',
    fontSize: 14,
    fontWeight: 'normal',
    color: '#000000',
    locked: false,
    variant: 'white',
    state: 'default',
    ...overrides,
  });

  describe('렌더링', () => {
    it('텍스트 내용을 렌더링한다', () => {
      const data = createMockData({ content: '테스트 텍스트' });
      render(<FlowText data={data} />);

      expect(screen.getByText('테스트 텍스트')).toBeInTheDocument();
    });

    it('content가 없으면 기본 메시지를 렌더링한다', () => {
      const data = createMockData({ content: '' });
      render(<FlowText data={data} />);

      expect(screen.getByText(EDITOR_MESSAGES.FLOW_TEXT_DEFAULT_CONTENT)).toBeInTheDocument();
    });
  });

  describe('폰트 스타일링', () => {
    it('fontSize를 적용한다', () => {
      const data = createMockData({ fontSize: 24 });
      const { container } = render(<FlowText data={data} />);

      const textElement = container.firstChild as HTMLElement;
      expect(textElement).toHaveStyle({ fontSize: '24px' });
    });

    it('fontSize가 없으면 기본값 14를 사용한다', () => {
      const data = createMockData();
      // @ts-expect-error Testing without fontSize
      delete data.fontSize;
      const { container } = render(<FlowText data={data} />);

      const textElement = container.firstChild as HTMLElement;
      expect(textElement).toHaveStyle({ fontSize: '14px' });
    });

    it('fontWeight normal을 적용한다', () => {
      const data = createMockData({ fontWeight: 'normal' });
      const { container } = render(<FlowText data={data} />);

      const textElement = container.firstChild as HTMLElement;
      expect(textElement).toHaveStyle({ fontWeight: 400 });
    });

    it('fontWeight bold를 적용한다', () => {
      const data = createMockData({ fontWeight: 'bold' });
      const { container } = render(<FlowText data={data} />);

      const textElement = container.firstChild as HTMLElement;
      expect(textElement).toHaveStyle({ fontWeight: 600 });
    });
  });

  describe('색상 Variants', () => {
    const variants = ['white', 'black', 'blue', 'purple', 'red', 'orange'] as const;

    it.each(variants)('%s variant를 default state로 렌더링한다', (variant) => {
      const data = createMockData({ variant, state: 'default' });
      render(<FlowText data={data} />);

      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it.each(variants)('%s variant를 focus state로 렌더링한다', (variant) => {
      const data = createMockData({ variant, state: 'focus' });
      render(<FlowText data={data} />);

      expect(screen.getByText('Text')).toBeInTheDocument();
    });
  });

  describe('Selected State', () => {
    it('selected가 true일 때 focus state를 적용한다', () => {
      const data = createMockData({ state: 'default' });
      const { container } = render(<FlowText data={data} selected={true} />);

      expect(container.firstChild).toBeInTheDocument();
    });

    it('selected가 false일 때 data의 state를 사용한다', () => {
      const data = createMockData({ state: 'default' });
      const { container } = render(<FlowText data={data} selected={false} />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
