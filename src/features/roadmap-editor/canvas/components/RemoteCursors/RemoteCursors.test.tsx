import { render, screen } from '@testing-library/react';
import { Provider, createStore } from 'jotai';
import { describe, expect, it, vi } from 'vitest';

import { remoteCursorsAtom } from '@/features/roadmap-editor/stores/editor-atoms';

import { RemoteCursors } from '.';

import type { RemoteCursor } from '@/features/roadmap-editor/stores/editor-atoms';

vi.mock('@xyflow/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@xyflow/react')>();
  return {
    ...actual,
    useReactFlow: () => ({
      flowToScreenPosition: ({ x, y }: { x: number; y: number }) => ({ x, y }),
    }),
  };
});

describe('RemoteCursors', () => {
  it('renders nothing when remoteCursorsAtom is empty', () => {
    const store = createStore();
    store.set(remoteCursorsAtom, new Map());

    const { container } = render(
      <Provider store={store}>
        <RemoteCursors />
      </Provider>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders a cursor for each entry in remoteCursorsAtom', () => {
    const cursors = new Map<string, RemoteCursor>([
      ['user-1', { userName: '홍길동', x: 100, y: 200, state: 'IDLE' }],
      ['user-2', { userName: '김철수', x: 300, y: 400, state: 'EDITING' }],
    ]);

    const store = createStore();
    store.set(remoteCursorsAtom, cursors);

    render(
      <Provider store={store}>
        <RemoteCursors />
      </Provider>,
    );

    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('김철수')).toBeInTheDocument();
  });

  it('renders cursor SVG icons for each user', () => {
    const cursors = new Map<string, RemoteCursor>([
      ['user-1', { userName: '테스터', x: 50, y: 50, state: 'IDLE' }],
    ]);

    const store = createStore();
    store.set(remoteCursorsAtom, cursors);

    const { container } = render(
      <Provider store={store}>
        <RemoteCursors />
      </Provider>,
    );

    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(1);
  });

  it('wraps cursors in a pointer-events-none overlay', () => {
    const cursors = new Map<string, RemoteCursor>([
      ['user-1', { userName: '오버레이 유저', x: 0, y: 0, state: 'IDLE' }],
    ]);

    const store = createStore();
    store.set(remoteCursorsAtom, cursors);

    const { container } = render(
      <Provider store={store}>
        <RemoteCursors />
      </Provider>,
    );

    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toHaveClass('pointer-events-none');
    expect(overlay).toHaveClass('absolute');
    expect(overlay).toHaveClass('inset-0');
  });
});
