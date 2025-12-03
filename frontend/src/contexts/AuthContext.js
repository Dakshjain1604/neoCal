import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (authToken) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [authToken]);

  const fetchUserProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      const response = await authAPI.createAnonymousSession();
      const { token, user_id } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', user_id);
      setAuthToken(token);
      
      // Fetch user profile
      await fetchUserProfile();
      
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setAuthToken(null);
    setUser(null);
  };

  const updateUserProfile = async (data) => {
    try {
      await userAPI.updateProfile(data);
      await fetchUserProfile();
      return { success: true };
    } catch (error) {
      console.error('Failed to update profile:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    authToken,
    loading,
    login,
    logout,
    updateUserProfile,
    isAuthenticated: !!authToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
