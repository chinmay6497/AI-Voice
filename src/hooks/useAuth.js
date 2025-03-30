import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp, logout, fetchUserProfile, updateProfile } from '../store/slices/authSlice';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error, userProfile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !userProfile) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, userProfile, dispatch]);

  const login = async (credentials) => {
    try {
      const result = await dispatch(signIn(credentials)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const result = await dispatch(signUp(userData)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (profileData) => {
    try {
      const result = await dispatch(updateProfile(profileData)).unwrap();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return {
    user,
    userProfile,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: logoutUser,
    updateProfile: updateUserProfile,
  };
};

export default useAuth; 