import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topics: [],
  selectedTopic: null,
  currentSession: null,
  sessionHistory: [],
  progress: {},
  loading: false,
  error: null,
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setTopics: (state, action) => {
      state.topics = action.payload;
    },
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
    setSessionHistory: (state, action) => {
      state.sessionHistory = action.payload;
    },
    addToHistory: (state, action) => {
      state.sessionHistory.push(action.payload);
    },
    updateProgress: (state, action) => {
      const { topicId, progress } = action.payload;
      state.progress[topicId] = progress;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetLearningState: (state) => {
      return initialState;
    },
  },
});

export const {
  setTopics,
  setSelectedTopic,
  setCurrentSession,
  setSessionHistory,
  addToHistory,
  updateProgress,
  setLoading,
  setError,
  resetLearningState,
} = learningSlice.actions;

export default learningSlice.reducer; 