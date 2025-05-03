import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { API_CONFIG, CURRENT_ENV } from '../config/api.config';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_CONFIG[CURRENT_ENV].baseURL,
  timeout: API_CONFIG[CURRENT_ENV].timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Clear token and redirect to login
          await SecureStore.deleteItemAsync('userToken');
          // You might want to add navigation logic here
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
      }
    }
    return Promise.reject(error);
  }
);

export default api; 