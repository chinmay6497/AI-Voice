import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentInterview: null,
  questions: [],
  answers: [],
  feedback: null,
  loading: false,
  error: null
};

const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    setCurrentInterview: (state, action) => {
      state.currentInterview = action.payload;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    addAnswer: (state, action) => {
      state.answers.push(action.payload);
    },
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetInterview: (state) => {
      state.currentInterview = null;
      state.questions = [];
      state.answers = [];
      state.feedback = null;
      state.error = null;
    }
  }
});

export const {
  setCurrentInterview,
  setQuestions,
  addAnswer,
  setFeedback,
  setLoading,
  setError,
  resetInterview
} = interviewSlice.actions;

export default interviewSlice.reducer; 