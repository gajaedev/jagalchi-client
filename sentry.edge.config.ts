import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_ENV ?? process.env.NODE_ENV,
    tracesSampleRate: process.env.NEXT_PUBLIC_ENV === 'production' ? 0.1 : 1.0,
  });
}
