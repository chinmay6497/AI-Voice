import React from 'react';
import ErrorBoundary from '../common/ErrorBoundary';

const LearningErrorBoundary = ({ children, onRetry }) => {
  return (
    <ErrorBoundary
      title="Learning Session Error"
      message="There was a problem loading your learning session. Your progress has been saved."
      retryText="Continue Learning"
      onRetry={onRetry}
    >
      {children}
    </ErrorBoundary>
  );
};

export default LearningErrorBoundary; 