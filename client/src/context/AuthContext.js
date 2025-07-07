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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Configure axios to send credentials with every request
  useEffect(() => {
    api.defaults.withCredentials = true;
  }, []);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/auth/me');
        setUser(response.data.data.user);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await api.post('/auth/login', credentials, {
        withCredentials: true
      });
      
      // The user data is returned in the response, but the token is in the cookie
      const { user } = response.data.data;
      setUser(user);
      
      // Return the full response including user data
      return { ...response.data, user };
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', userData, {
        withCredentials: true
      });
      
      // The user data is returned in the response, but the token is in the cookie
      const { user } = response.data.data;
      setUser(user);
      
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Save current theme before logout
      const currentTheme = localStorage.getItem('theme');
      
      await api.post('/auth/logout', {}, { withCredentials: true });
      
      // Clear user state and any stored data
      setUser(null);
      localStorage.removeItem('user');
      
      // Clear any axios authorization headers
      delete api.defaults.headers.common['Authorization'];
      
      // Clear any cached requests
      try {
        await api.get('/auth/clear-cache');
      } catch (cacheError) {
        console.error('Cache clear error:', cacheError);
      }
      
      // Restore the theme
      if (currentTheme) {
        localStorage.setItem('theme', currentTheme);
      }
      
      // Navigate to login page without full page reload
      navigate('/login', { replace: true });
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the server logout fails, we should still clear the local state
      setUser(null);
      localStorage.removeItem('user');
      delete api.defaults.headers.common['Authorization'];
      navigate('/login', { replace: true });
      return false;
    }
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(prev => ({
      ...prev,
      ...userData
    }));
  };

  // Add isAuthenticated based on user state
  const isAuthenticated = !!user;

  // Only render children once we've checked auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        error,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
