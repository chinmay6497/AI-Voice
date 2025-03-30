import axios from 'axios';
import { handleApiError, handleValidationError, handleAuthError } from '../store/middleware/errorMiddleware';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different types of errors
    if (error.response?.status === 401) {
      return Promise.reject(handleAuthError(error));
    }
    if (error.response?.status === 422) {
      return Promise.reject(handleValidationError(error));
    }
    return Promise.reject(handleApiError(error));
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};

// Interview API
export const interviewAPI = {
  getTopics: () => api.get('/interview/topics'),
  getAIInterviewers: () => api.get('/interview/ai-interviewers'),
  startInterview: (interviewData) => api.post('/interview/start', interviewData),
  submitAnswer: (answerData) => api.post('/interview/submit-answer', answerData),
  getFeedback: (interviewId) => api.get(`/interview/feedback/${interviewId}`),
  getInterviewHistory: () => api.get('/interview/history'),
};

// Learning API
export const learningAPI = {
  getTopics: () => api.get('/learning/topics'),
  getTopicDetails: (topicId) => api.get(`/learning/topics/${topicId}`),
  startSession: (sessionData) => api.post('/learning/sessions', sessionData),
  getSessionHistory: () => api.get('/learning/sessions/history'),
  updateProgress: (progressData) => api.post('/learning/progress', progressData),
};

// Speech-to-Text API
export const speechAPI = {
  transcribeAudio: (audioData) => api.post('/speech/transcribe', audioData),
};

// Text-to-Speech API
export const ttsAPI = {
  generateSpeech: (textData) => api.post('/tts/generate', textData),
};

export default api; 