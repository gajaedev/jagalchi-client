import { describe, it, expect } from 'vitest';

import { sanitizeHtml, sanitizeText } from './sanitize';

describe('sanitizeHtml', () => {
  it('allows safe tags', () => {
    const input = '<b>bold</b> and <em>italic</em>';
    expect(sanitizeHtml(input)).toBe('<b>bold</b> and <em>italic</em>');
  });

  it('strips script tags', () => {
    const input = '<script>alert("xss")</script>hello';
    expect(sanitizeHtml(input)).toBe('hello');
  });

  it('strips event handlers', () => {
    const input = '<b onmouseover="alert(1)">text</b>';
    expect(sanitizeHtml(input)).toBe('<b>text</b>');
  });

  it('allows href on links', () => {
    const input = '<a href="https://example.com">link</a>';
    expect(sanitizeHtml(input)).toBe('<a href="https://example.com">link</a>');
  });

  it('strips disallowed tags', () => {
    const input = '<div><img src=x onerror=alert(1)><b>safe</b></div>';
    expect(sanitizeHtml(input)).toBe('<b>safe</b>');
  });
});

describe('sanitizeText', () => {
  it('strips all HTML tags', () => {
    const input = '<b>bold</b> <script>alert("xss")</script>text';
    expect(sanitizeText(input)).toBe('bold text');
  });

  it('returns plain text unchanged', () => {
    expect(sanitizeText('hello world')).toBe('hello world');
  });

  it('handles empty string', () => {
    expect(sanitizeText('')).toBe('');
  });
});
