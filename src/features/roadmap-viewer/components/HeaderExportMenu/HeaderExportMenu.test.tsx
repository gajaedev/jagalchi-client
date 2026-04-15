import { describe, it, expect } from 'vitest';

import { handleExportJson, handleExportMarkdown, handleExportPdf } from './index';

describe('HeaderExportMenu', () => {
  it('exports handleExportMarkdown as a function', () => {
    expect(typeof handleExportMarkdown).toBe('function');
  });

  it('exports handleExportPdf as a function', () => {
    expect(typeof handleExportPdf).toBe('function');
  });

  it('exports handleExportJson as a function', () => {
    expect(typeof handleExportJson).toBe('function');
  });
});
