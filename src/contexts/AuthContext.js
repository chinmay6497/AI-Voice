import React, { createContext, useContext, useState, useEffect } from 'react';
import firebaseAuthService from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseAuthService.auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    try {
      setError(null);
      const user = await firebaseAuthService.signUp(email, password);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const signin = async (email, password) => {
    try {
      setError(null);
      const user = await firebaseAuthService.signIn(email, password);
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      const user = await firebaseAuthService.signInWithGoogle();
      return user;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const signout = async () => {
    try {
      setError(null);
      await firebaseAuthService.signOut();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setError(null);
      await firebaseAuthService.resendVerificationEmail();
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signInWithGoogle,
    signout,
    resendVerificationEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 