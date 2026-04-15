import { describe, it, expect } from 'vitest';

import { handleSaveAsJpg, handleSaveAsPng, handleSaveAsSvg } from './index';

describe('HeaderSaveAsImageMenu', () => {
  it('exports handleSaveAsPng as a function', () => {
    expect(typeof handleSaveAsPng).toBe('function');
  });

  it('exports handleSaveAsJpg as a function', () => {
    expect(typeof handleSaveAsJpg).toBe('function');
  });

  it('exports handleSaveAsSvg as a function', () => {
    expect(typeof handleSaveAsSvg).toBe('function');
  });
});
