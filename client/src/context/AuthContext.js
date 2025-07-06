import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext(null);

// Create a custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Set auth token in axios headers
  const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          setAuthToken(token);
          const response = await api.get('/auth/me');
          setUser(response.data.data.user);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data.data;
      
      setUser(user);
      setToken(token);
      setAuthToken(token);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data.data;
      
      setUser(user);
      setToken(token);
      setAuthToken(token);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    navigate('/login');
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(prev => ({
      ...prev,
      ...userData
    }));
  };

  const value = {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
