import { toast } from 'react-toastify';
import errorTrackingService from '../../services/errorTrackingService';

// Custom error types
export class ApiError extends Error {
  constructor(message, status, code, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends Error {
  constructor(message, field, details = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
    this.details = details;
  }
}

export class AuthError extends Error {
  constructor(message, code = 'AUTH_ERROR') {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}

// Error handling middleware
export const errorMiddleware = () => (next) => (action) => {
  // Handle rejected actions
  if (action.type.endsWith('/rejected')) {
    const error = action.error;
    let errorMessage = 'An unexpected error occurred';
    let errorType = 'error';

    // Handle different types of errors
    if (error instanceof ApiError) {
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid request. Please check your input.';
          errorType = 'warning';
          break;
        case 401:
          errorMessage = 'Your session has expired. Please log in again.';
          errorType = 'error';
          // You might want to trigger a logout action here
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          errorType = 'error';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          errorType = 'warning';
          break;
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          errorType = 'warning';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          errorType = 'error';
          break;
        default:
          errorMessage = error.message || 'An unexpected error occurred';
      }
    } else if (error instanceof ValidationError) {
      errorMessage = `Validation error: ${error.message}`;
      errorType = 'warning';
    } else if (error instanceof AuthError) {
      errorMessage = error.message;
      errorType = 'error';
    }

    // Show toast notification
    toast[errorType](errorMessage, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    // Track error with context
    errorTrackingService.captureError(error, {
      action: action.type,
      payload: action.payload,
      meta: action.meta,
      errorType: error.name,
      errorCode: error.code,
      errorStatus: error.status,
      errorDetails: error.details,
    });

    // Log error for debugging
    console.error('Action rejected:', {
      type: action.type,
      error: error.message,
      stack: error.stack,
      details: error.details,
    });
  }

  return next(action);
};

// Error handling utility functions
export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new ApiError(
      error.response.data.message || 'An error occurred',
      error.response.status,
      error.response.data.code,
      error.response.data.details
    );
  } else if (error.request) {
    // The request was made but no response was received
    throw new ApiError('No response received from server', 0, 'NETWORK_ERROR');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new ApiError(error.message, 0, 'REQUEST_ERROR');
  }
};

export const handleValidationError = (error) => {
  if (error.response?.data?.errors) {
    const validationErrors = error.response.data.errors;
    const firstError = Object.entries(validationErrors)[0];
    throw new ValidationError(
      firstError[1],
      firstError[0],
      validationErrors
    );
  }
  throw error;
};

export const handleAuthError = (error) => {
  if (error.response?.status === 401) {
    throw new AuthError('Authentication failed. Please log in again.', 'AUTH_EXPIRED');
  }
  throw error;
}; 