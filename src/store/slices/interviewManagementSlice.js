import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const scheduleInterview = createAsyncThunk(
  'interviewManagement/scheduleInterview',
  async (interviewData) => {
    const response = await api.interviews.scheduleInterview(interviewData);
    return response.data;
  }
);

export const getInterviewHistory = createAsyncThunk(
  'interviewManagement/getInterviewHistory',
  async () => {
    const response = await api.interviews.getHistory();
    return response.data;
  }
);

export const submitFeedback = createAsyncThunk(
  'interviewManagement/submitFeedback',
  async ({ interviewId, feedback }) => {
    const response = await api.interviews.submitFeedback(interviewId, feedback);
    return response.data;
  }
);

const initialState = {
  scheduledInterviews: [],
  interviewHistory: [],
  feedback: {},
  loading: {
    scheduling: false,
    history: false,
    feedback: false,
  },
  error: {
    scheduling: null,
    history: null,
    feedback: null,
  },
};

const interviewManagementSlice = createSlice({
  name: 'interviewManagement',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = {
        scheduling: null,
        history: null,
        feedback: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Schedule Interview
      .addCase(scheduleInterview.pending, (state) => {
        state.loading.scheduling = true;
        state.error.scheduling = null;
      })
      .addCase(scheduleInterview.fulfilled, (state, action) => {
        state.loading.scheduling = false;
        state.scheduledInterviews.push(action.payload);
      })
      .addCase(scheduleInterview.rejected, (state, action) => {
        state.loading.scheduling = false;
        state.error.scheduling = action.error.message;
      })
      // Get Interview History
      .addCase(getInterviewHistory.pending, (state) => {
        state.loading.history = true;
        state.error.history = null;
      })
      .addCase(getInterviewHistory.fulfilled, (state, action) => {
        state.loading.history = false;
        state.interviewHistory = action.payload;
      })
      .addCase(getInterviewHistory.rejected, (state, action) => {
        state.loading.history = false;
        state.error.history = action.error.message;
      })
      // Submit Feedback
      .addCase(submitFeedback.pending, (state) => {
        state.loading.feedback = true;
        state.error.feedback = null;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.loading.feedback = false;
        state.feedback[action.payload.interviewId] = action.payload.feedback;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading.feedback = false;
        state.error.feedback = action.error.message;
      });
  },
});

export const { clearErrors } = interviewManagementSlice.actions;
export default interviewManagementSlice.reducer; 