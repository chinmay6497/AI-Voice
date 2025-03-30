import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary';
import PropTypes from 'prop-types';

const LearningErrorBoundary = ({ children, onRetry }) => {
  return (
    <ErrorBoundary
      title="Learning Session Error"
      message="There was an error during the learning session. Your progress has been saved."
      retryText="Resume Learning"
      onRetry={onRetry}
    >
      {children}
    </ErrorBoundary>
  );
};

LearningErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onRetry: PropTypes.func,
};

export default LearningErrorBoundary; 