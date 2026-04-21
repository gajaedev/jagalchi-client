export const FLAGS = {
  REALTIME_ENABLED: process.env.NEXT_PUBLIC_REALTIME_ENABLED === 'true',
  AI_FEATURES_ENABLED: process.env.NEXT_PUBLIC_AI_FEATURES_ENABLED === 'true',
  OAUTH_ENABLED: process.env.NEXT_PUBLIC_OAUTH_ENABLED !== 'false',
} as const;

export type FeatureFlag = keyof typeof FLAGS;

export function isEnabled(flag: FeatureFlag): boolean {
  return FLAGS[flag];
}
