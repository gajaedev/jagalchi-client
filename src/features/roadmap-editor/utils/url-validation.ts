/**
 * URL validation utilities to prevent XSS and invalid URLs
 */

/**
 * Validate and sanitize a URL string
 * @param url - The URL to validate
 * @returns Sanitized URL or null if invalid
 */
export function validateUrl(url: string): string | null {
  // Allow empty strings (for unused resource slots)
  if (!url || url.trim() === '') {
    return '';
  }

  const trimmed = url.trim();

  // Prevent javascript: and data: URIs (XSS vectors)
  const lowerUrl = trimmed.toLowerCase();
  if (
    lowerUrl.startsWith('javascript:') ||
    lowerUrl.startsWith('data:') ||
    lowerUrl.startsWith('vbscript:')
  ) {
    return null;
  }

  // Validate URL format
  try {
    const urlObj = new URL(trimmed);

    // Only allow http, https, and mailto protocols
    const allowedProtocols = ['http:', 'https:', 'mailto:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return null;
    }

    return trimmed;
  } catch {
    // If URL constructor fails, try prepending https://
    try {
      const urlObj = new URL(`https://${trimmed}`);
      return urlObj.toString();
    } catch {
      return null;
    }
  }
}

/**
 * Check if a URL is valid
 * @param url - The URL to check
 * @returns true if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  return validateUrl(url) !== null;
}
