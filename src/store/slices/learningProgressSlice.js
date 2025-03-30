import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchLearningProgress = createAsyncThunk(
  'learningProgress/fetchProgress',
  async () => {
    const response = await api.learning.getProgress();
    return response.data;
  }
);

export const updateTopicProgress = createAsyncThunk(
  'learningProgress/updateTopicProgress',
  async ({ topicId, progress }) => {
    const response = await api.learning.updateProgress(topicId, progress);
    return response.data;
  }
);

export const completeModule = createAsyncThunk(
  'learningProgress/completeModule',
  async ({ topicId, moduleId }) => {
    const response = await api.learning.completeModule(topicId, moduleId);
    return response.data;
  }
);

export const unlockAchievement = createAsyncThunk(
  'learningProgress/unlockAchievement',
  async (achievementId) => {
    const response = await api.learning.unlockAchievement(achievementId);
    return response.data;
  }
);

const initialState = {
  topics: {},
  completedModules: [],
  achievements: [],
  currentStreak: 0,
  totalPoints: 0,
  loading: {
    progress: false,
    topics: false,
    modules: false,
    achievements: false,
  },
  error: {
    progress: null,
    topics: null,
    modules: null,
    achievements: null,
  },
};

const learningProgressSlice = createSlice({
  name: 'learningProgress',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = {
        progress: null,
        topics: null,
        modules: null,
        achievements: null,
      };
    },
    resetProgress: (state) => {
      state.completedModules = [];
      state.currentStreak = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Learning Progress
      .addCase(fetchLearningProgress.pending, (state) => {
        state.loading.progress = true;
        state.error.progress = null;
      })
      .addCase(fetchLearningProgress.fulfilled, (state, action) => {
        state.loading.progress = false;
        state.topics = action.payload.topics;
        state.completedModules = action.payload.completedModules;
        state.achievements = action.payload.achievements;
        state.currentStreak = action.payload.currentStreak;
        state.totalPoints = action.payload.totalPoints;
      })
      .addCase(fetchLearningProgress.rejected, (state, action) => {
        state.loading.progress = false;
        state.error.progress = action.error.message;
      })
      // Update Topic Progress
      .addCase(updateTopicProgress.pending, (state) => {
        state.loading.topics = true;
        state.error.topics = null;
      })
      .addCase(updateTopicProgress.fulfilled, (state, action) => {
        state.loading.topics = false;
        state.topics[action.payload.topicId] = {
          ...state.topics[action.payload.topicId],
          progress: action.payload.progress,
        };
      })
      .addCase(updateTopicProgress.rejected, (state, action) => {
        state.loading.topics = false;
        state.error.topics = action.error.message;
      })
      // Complete Module
      .addCase(completeModule.pending, (state) => {
        state.loading.modules = true;
        state.error.modules = null;
      })
      .addCase(completeModule.fulfilled, (state, action) => {
        state.loading.modules = false;
        state.completedModules.push(action.payload.moduleId);
        state.totalPoints += action.payload.pointsEarned;
        if (action.payload.updatedStreak) {
          state.currentStreak = action.payload.updatedStreak;
        }
      })
      .addCase(completeModule.rejected, (state, action) => {
        state.loading.modules = false;
        state.error.modules = action.error.message;
      })
      // Unlock Achievement
      .addCase(unlockAchievement.pending, (state) => {
        state.loading.achievements = true;
        state.error.achievements = null;
      })
      .addCase(unlockAchievement.fulfilled, (state, action) => {
        state.loading.achievements = false;
        state.achievements.push(action.payload);
        state.totalPoints += action.payload.pointsAwarded;
      })
      .addCase(unlockAchievement.rejected, (state, action) => {
        state.loading.achievements = false;
        state.error.achievements = action.error.message;
      });
  },
});

export const { clearErrors, resetProgress } = learningProgressSlice.actions;
export default learningProgressSlice.reducer; 