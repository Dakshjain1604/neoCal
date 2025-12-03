import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['X-Auth-Token'] = token;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  createAnonymousSession: () => api.post('/api/auth/anonymous-session'),
};

// User APIs
export const userAPI = {
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (data) => api.put('/api/user/profile', data),
};

// Meal APIs
export const mealAPI = {
  createFromText: (description) => api.post('/api/meals/from-text', { description }),
  createFromImage: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/api/meals/from-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  createFromBarcode: (barcode, servings = 1) => 
    api.post('/api/meals/from-barcode', { barcode, servings }),
  getMeal: (mealId) => api.get(`/api/meals/${mealId}`),
  getMealsByDate: (date) => api.get('/api/meals', { params: { date } }),
  getDailySummary: (date) => api.get('/api/summary/day', { params: { date } }),
};

export default api;
