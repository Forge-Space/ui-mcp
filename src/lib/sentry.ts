import * as Sentry from '@sentry/node';

const dsn = process.env.SENTRY_DSN;
if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.NODE_ENV ?? 'development',
    tracesSampleRate: 0.1,
    beforeSend(event) {
      if (process.env.NODE_ENV === 'test') return null;
      return event;
    },
  });
}

export async function captureExceptionAndFlush(error: unknown): Promise<void> {
  if (dsn) {
    Sentry.captureException(error);
    await Sentry.close(2000);
  }
}
