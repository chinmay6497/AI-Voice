import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import interviewReducer from './slices/interviewSlice';
import learningReducer from './slices/learningSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    interview: interviewReducer,
    learning: learningReducer,
  },
});

export default store; 