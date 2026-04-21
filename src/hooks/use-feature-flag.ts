'use client';

import { isEnabled, type FeatureFlag } from '@/lib/feature-flags';

export function useFeatureFlag(flag: FeatureFlag): boolean {
  return isEnabled(flag);
}
