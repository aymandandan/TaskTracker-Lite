import axios from 'axios';

// Create axios instance with base URL and headers
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Required for HTTP-only cookies
});

// Request interceptor for adding any additional headers if needed
api.interceptors.request.use(
  (config) => {
    // You can add any request headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (e.g., 401 Unauthorized)
    if (error.response?.status === 401) {
      // Clear any existing auth state
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// Tasks API (will be used in future prompts)
export const tasksAPI = {
  // Will be implemented in future prompts
};

export default api;
