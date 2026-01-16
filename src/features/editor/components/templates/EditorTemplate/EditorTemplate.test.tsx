import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { EditorTemplate } from './index';

describe('EditorTemplate', () => {
  it('renders children (canvas)', () => {
    render(
      <EditorTemplate>
        <div>Canvas Content</div>
      </EditorTemplate>,
    );

    expect(screen.getByText('Canvas Content')).toBeInTheDocument();
  });

  it('renders header when provided', () => {
    render(
      <EditorTemplate header={<div>Header Content</div>}>
        <div>Canvas Content</div>
      </EditorTemplate>,
    );

    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('renders toolbar when provided', () => {
    render(
      <EditorTemplate toolbar={<div>Toolbar Content</div>}>
        <div>Canvas Content</div>
      </EditorTemplate>,
    );

    expect(screen.getByText('Toolbar Content')).toBeInTheDocument();
  });

  it('renders fixed sidebar on right when provided', () => {
    const { container } = render(
      <EditorTemplate sidebar={<div>Sidebar Content</div>}>
        <div>Canvas Content</div>
      </EditorTemplate>,
    );

    expect(screen.getByText('Sidebar Content')).toBeInTheDocument();

    const sidebar = container.querySelector('.w-\\[320px\\]');
    expect(sidebar).toBeInTheDocument();
    expect(sidebar).toHaveClass('border-l');
    expect(sidebar).toHaveClass('bg-background');
    expect(sidebar).toHaveClass('overflow-y-auto');
  });

  it('does not render sidebar when not provided', () => {
    const { container } = render(
      <EditorTemplate>
        <div>Canvas Content</div>
      </EditorTemplate>,
    );

    const sidebar = container.querySelector('.w-\\[320px\\]');
    expect(sidebar).not.toBeInTheDocument();
  });

  it('has correct layout structure', () => {
    const { container } = render(
      <EditorTemplate
        header={<div>Header</div>}
        sidebar={<div>Sidebar</div>}
        toolbar={<div>Toolbar</div>}
      >
        <div>Canvas</div>
      </EditorTemplate>,
    );

    // Root container
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveClass('relative', 'h-screen', 'w-screen', 'overflow-hidden');

    // Header at top
    const header = container.querySelector('.fixed.top-0');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('z-40', 'bg-background', 'border-b');

    // Canvas + Sidebar container
    const mainArea = container.querySelector('.absolute.inset-0.top-\\[56px\\].flex');
    expect(mainArea).toBeInTheDocument();

    // Canvas flex-1
    const canvas = mainArea?.querySelector('.flex-1.relative');
    expect(canvas).toBeInTheDocument();

    // Toolbar at bottom center
    const toolbar = container.querySelector('.fixed.bottom-4');
    expect(toolbar).toBeInTheDocument();
    expect(toolbar).toHaveClass('left-1/2', '-translate-x-1/2', 'z-40');
  });

  it('header has fixed positioning with proper z-index', () => {
    const { container } = render(
      <EditorTemplate header={<div>Header</div>}>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    const header = container.querySelector('.fixed.top-0');
    expect(header).toHaveClass('left-0', 'right-0', 'z-40');
  });

  it('canvas takes remaining space', () => {
    const { container } = render(
      <EditorTemplate>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    const canvas = container.querySelector('.flex-1.relative');
    expect(canvas).toBeInTheDocument();
  });

  it('sidebar has fixed 320px width', () => {
    const { container } = render(
      <EditorTemplate sidebar={<div>Sidebar</div>}>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    const sidebar = container.querySelector('.w-\\[320px\\]');
    expect(sidebar).toBeInTheDocument();
  });

  it('toolbar is centered horizontally and fixed at bottom', () => {
    const { container } = render(
      <EditorTemplate toolbar={<div>Toolbar</div>}>
        <div>Canvas</div>
      </EditorTemplate>,
    );

    const toolbar = container.querySelector('.fixed.bottom-4');
    expect(toolbar).toHaveClass('left-1/2', '-translate-x-1/2');
  });
});
