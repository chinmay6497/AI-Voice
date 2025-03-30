import React from 'react';
import ErrorBoundary from '../common/ErrorBoundary';

const InterviewErrorBoundary = ({ children, onRetry }) => {
  return (
    <ErrorBoundary
      title="Interview Session Error"
      message="There was a problem with your interview session. Your progress has been saved."
      retryText="Resume Interview"
      onRetry={onRetry}
    >
      {children}
    </ErrorBoundary>
  );
};

export default InterviewErrorBoundary; 