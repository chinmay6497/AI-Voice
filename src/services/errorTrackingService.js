import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

class ErrorTrackingService {
  constructor() {
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    // Initialize Sentry
    Sentry.init({
      dsn: process.env.REACT_APP_SENTRY_DSN,
      environment: process.env.NODE_ENV,
      integrations: [
        new BrowserTracing({
          tracePropagationTargets: ['localhost', /^https:\/\/yourdomain\.com/],
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0,
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });

    this.initialized = true;
  }

  captureError(error, context = {}) {
    if (!this.initialized) {
      console.error('Error tracking not initialized:', error, context);
      return;
    }

    Sentry.captureException(error, {
      extra: context,
    });
  }

  captureMessage(message, level = 'info', context = {}) {
    if (!this.initialized) {
      console.log('Error tracking not initialized:', message, level, context);
      return;
    }

    Sentry.captureMessage(message, {
      level,
      extra: context,
    });
  }

  setUser(user) {
    if (!this.initialized) return;

    Sentry.setUser({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  }

  clearUser() {
    if (!this.initialized) return;

    Sentry.setUser(null);
  }

  addBreadcrumb(breadcrumb) {
    if (!this.initialized) return;

    Sentry.addBreadcrumb(breadcrumb);
  }

  setTag(key, value) {
    if (!this.initialized) return;

    Sentry.setTag(key, value);
  }

  setContext(key, context) {
    if (!this.initialized) return;

    Sentry.setContext(key, context);
  }
}

// Create singleton instance
const errorTrackingService = new ErrorTrackingService();

// Initialize in development if DSN is provided
if (process.env.REACT_APP_SENTRY_DSN) {
  errorTrackingService.init();
}

export default errorTrackingService; 