import React from 'react';
import ErrorBoundary from '../../common/ErrorBoundary';
import PropTypes from 'prop-types';

const InterviewErrorBoundary = ({ children, onRetry }) => {
  return (
    <ErrorBoundary
      title="Interview Error"
      message="There was an error during the interview session. Your progress has been saved."
      retryText="Restart Interview"
      onRetry={onRetry}
    >
      {children}
    </ErrorBoundary>
  );
};

InterviewErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onRetry: PropTypes.func,
};

export default InterviewErrorBoundary; 