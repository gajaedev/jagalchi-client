import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Mock ResizeObserver (Enhanced for Radix UI)
global.ResizeObserver = class FakeResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(cb: any) {
    this.cb = cb;
  }
  observe() {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
  }
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = '';
  thresholds = [];
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock PointerEvent for Radix UI components (Full implementation)
// @ts-expect-error - FakePointerEvent extends MouseEvent with additional properties
global.PointerEvent = class FakePointerEvent extends MouseEvent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _props: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(type: string, props: any = {}) {
    super(type, props);
    this._props = props;
  }

  // Override readonly properties with getters
  get button() {
    return this._props.button ?? 0;
  }

  get ctrlKey() {
    return this._props.ctrlKey ?? false;
  }

  get pointerType() {
    return this._props.pointerType ?? 'mouse';
  }

  get pointerId() {
    return this._props.pointerId ?? 1;
  }

  get width() {
    return this._props.width ?? 1;
  }

  get height() {
    return this._props.height ?? 1;
  }

  get pageX() {
    return this._props.pageX ?? 0;
  }

  get pageY() {
    return this._props.pageY ?? 0;
  }
};

// Mock DOMRect for Radix UI positioning
// @ts-expect-error - Simplified DOMRect implementation
global.DOMRect = class FakeDOMRect {
  static fromRect() {
    return {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      width: 0,
      height: 0,
    };
  }
};

// Mock HTMLElement.prototype methods for Radix UI
HTMLElement.prototype.scrollIntoView = function () {
  // Mock implementation
};

HTMLElement.prototype.hasPointerCapture = function () {
  return true;
};

HTMLElement.prototype.releasePointerCapture = function () {
  // Mock implementation
};
