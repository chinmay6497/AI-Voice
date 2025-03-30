import axios from 'axios';
import { withRetry } from '../retryService';
import { handleApiError, handleAuthError, handleValidationError } from '../../store/middleware/errorMiddleware';

class BaseApi {
  constructor(baseURL) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          return Promise.reject(handleAuthError(error));
        }
        if (error.response?.status === 422) {
          return Promise.reject(handleValidationError(error));
        }
        return Promise.reject(handleApiError(error));
      }
    );
  }

  // Generic CRUD methods with retry logic
  async get(url, config = {}) {
    return withRetry(() => this.api.get(url, config));
  }

  async post(url, data, config = {}) {
    return withRetry(() => this.api.post(url, data, config));
  }

  async put(url, data, config = {}) {
    return withRetry(() => this.api.put(url, data, config));
  }

  async delete(url, config = {}) {
    return withRetry(() => this.api.delete(url, config));
  }

  // File upload method
  async upload(url, file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);

    return withRetry(() =>
      this.api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            onProgress(progress);
          }
        },
      })
    );
  }

  // WebSocket connection method
  connectWebSocket(url, options = {}) {
    const ws = new WebSocket(url);
    
    ws.onopen = () => {
      console.log('WebSocket connected');
      if (options.onOpen) options.onOpen();
    };

    ws.onmessage = (event) => {
      if (options.onMessage) options.onMessage(JSON.parse(event.data));
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (options.onError) options.onError(error);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      if (options.onClose) options.onClose();
    };

    return ws;
  }
}

export default BaseApi; 