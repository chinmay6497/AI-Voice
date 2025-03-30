import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const fetchUserPreferences = createAsyncThunk(
  'userPreferences/fetchPreferences',
  async () => {
    const response = await api.user.getPreferences();
    return response.data;
  }
);

export const updateUserPreferences = createAsyncThunk(
  'userPreferences/updatePreferences',
  async (preferences) => {
    const response = await api.user.updatePreferences(preferences);
    return response.data;
  }
);

const initialState = {
  theme: {
    mode: 'light',
    primaryColor: '#1976d2',
    fontSize: 'medium',
  },
  notifications: {
    email: true,
    push: true,
    reminders: true,
    marketingEmails: false,
  },
  study: {
    dailyGoal: 2, // hours
    preferredTopics: [],
    difficulty: 'medium',
    showSolutions: false,
  },
  interview: {
    preferredLanguage: 'javascript',
    useAIInterviewer: true,
    recordSession: true,
    feedbackDetail: 'detailed',
  },
  accessibility: {
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
  },
  loading: false,
  error: null,
  lastUpdated: null,
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.theme.mode = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.theme.primaryColor = action.payload;
    },
    setFontSize: (state, action) => {
      state.theme.fontSize = action.payload;
    },
    toggleNotification: (state, action) => {
      const { type } = action.payload;
      state.notifications[type] = !state.notifications[type];
    },
    updateStudyPreferences: (state, action) => {
      state.study = {
        ...state.study,
        ...action.payload,
      };
    },
    updateInterviewPreferences: (state, action) => {
      state.interview = {
        ...state.interview,
        ...action.payload,
      };
    },
    updateAccessibility: (state, action) => {
      state.accessibility = {
        ...state.accessibility,
        ...action.payload,
      };
    },
    resetPreferences: (state) => {
      return {
        ...initialState,
        loading: false,
        error: null,
        lastUpdated: new Date().toISOString(),
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Preferences
      .addCase(fetchUserPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPreferences.fulfilled, (state, action) => {
        state.loading = false;
        return {
          ...state,
          ...action.payload,
          lastUpdated: new Date().toISOString(),
        };
      })
      .addCase(fetchUserPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Preferences
      .addCase(updateUserPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.loading = false;
        return {
          ...state,
          ...action.payload,
          lastUpdated: new Date().toISOString(),
        };
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setThemeMode,
  setPrimaryColor,
  setFontSize,
  toggleNotification,
  updateStudyPreferences,
  updateInterviewPreferences,
  updateAccessibility,
  resetPreferences,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer; 