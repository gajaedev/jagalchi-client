import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { EditorTemplate } from './index';

describe('EditorTemplate', () => {
  it('children을 렌더링한다', () => {
    render(
      <EditorTemplate>
        <div data-testid="canvas">Canvas Content</div>
      </EditorTemplate>,
    );

    expect(screen.getByTestId('canvas')).toBeInTheDocument();
    expect(screen.getByText('Canvas Content')).toBeInTheDocument();
  });

  it('header를 렌더링한다', () => {
    render(
      <EditorTemplate header={<div data-testid="header">Header</div>}>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('toolbar를 렌더링한다', () => {
    render(
      <EditorTemplate toolbar={<div data-testid="toolbar">Toolbar</div>}>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
  });

  it('sidebar를 렌더링한다', () => {
    render(
      <EditorTemplate sidebar={<div data-testid="sidebar">Sidebar</div>}>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  it('모든 섹션을 동시에 렌더링한다', () => {
    render(
      <EditorTemplate
        header={<div data-testid="header">Header</div>}
        toolbar={<div data-testid="toolbar">Toolbar</div>}
        sidebar={<div data-testid="sidebar">Sidebar</div>}
      >
        <div data-testid="canvas">Canvas</div>
      </EditorTemplate>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('toolbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  it('header가 fixed positioning을 가진다', () => {
    render(
      <EditorTemplate header={<div data-testid="header">Header</div>}>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    const headerContainer = screen.getByTestId('header').parentElement;
    expect(headerContainer).toHaveClass('fixed');
    expect(headerContainer).toHaveClass('top-0');
  });

  it('toolbar가 fixed positioning을 가진다', () => {
    render(
      <EditorTemplate toolbar={<div data-testid="toolbar">Toolbar</div>}>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    const toolbarContainer = screen.getByTestId('toolbar').parentElement;
    expect(toolbarContainer).toHaveClass('fixed');
    expect(toolbarContainer).toHaveClass('bottom-4');
  });

  it('canvas가 absolute positioning을 가진다', () => {
    render(
      <EditorTemplate>
        <div data-testid="canvas">Canvas</div>
      </EditorTemplate>,
    );

    const canvasContainer = screen.getByTestId('canvas').parentElement;
    expect(canvasContainer).toHaveClass('absolute');
    expect(canvasContainer).toHaveClass('inset-0');
  });

  it('커스텀 className이 적용된다', () => {
    const { container } = render(
      <EditorTemplate className="custom-class">
        <div>Canvas</div>
      </EditorTemplate>,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('header가 없으면 렌더링하지 않는다', () => {
    const { container } = render(
      <EditorTemplate>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    const headers = container.querySelectorAll('.fixed.top-0');
    expect(headers).toHaveLength(0);
  });

  it('toolbar가 없으면 렌더링하지 않는다', () => {
    const { container } = render(
      <EditorTemplate>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    const toolbars = container.querySelectorAll('.fixed.bottom-4');
    expect(toolbars).toHaveLength(0);
  });
});
