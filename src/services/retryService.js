import { toast } from 'react-toastify';

const MAX_RETRIES = 3;
const INITIAL_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const shouldRetry = (error) => {
  // Retry on network errors or 5xx server errors
  return (
    !error.response || // Network error
    error.response.status >= 500 || // Server error
    error.response.status === 429 // Rate limit
  );
};

const getRetryDelay = (attempt) => {
  // Exponential backoff with jitter
  const baseDelay = INITIAL_DELAY * Math.pow(2, attempt - 1);
  const jitter = Math.random() * 1000; // Random delay between 0-1s
  return baseDelay + jitter;
};

export const withRetry = async (apiCall, options = {}) => {
  const {
    maxRetries = MAX_RETRIES,
    onRetry,
    retryable = shouldRetry,
  } = options;

  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      if (!retryable(error) || attempt === maxRetries) {
        throw error;
      }

      const delay = getRetryDelay(attempt);
      
      // Show retry notification
      toast.info(`Retrying... (Attempt ${attempt}/${maxRetries})`, {
        position: 'top-right',
        autoClose: delay,
      });

      // Wait before retrying
      await sleep(delay);

      // Call onRetry callback if provided
      if (onRetry) {
        onRetry(attempt, error);
      }
    }
  }

  throw lastError;
};

// Example usage:
/*
const fetchData = async () => {
  try {
    const result = await withRetry(
      () => api.get('/some-endpoint'),
      {
        maxRetries: 3,
        onRetry: (attempt, error) => {
          console.log(`Retry attempt ${attempt} after error:`, error);
        },
      }
    );
    return result;
  } catch (error) {
    // Handle final error
    console.error('All retry attempts failed:', error);
    throw error;
  }
};
*/ 