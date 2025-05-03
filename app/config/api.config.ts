export const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 10000,
  },
  staging: {
    baseURL: 'https://staging-api.roundcount.com',
    timeout: 10000,
  },
  production: {
    baseURL: 'https://api.roundcount.com',
    timeout: 10000,
  },
} as const;

// Current environment - change this when deploying
export const CURRENT_ENV = 'development';

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
  },
  firearms: {
    list: '/firearms',
    create: '/firearms',
    update: (id: string) => `/firearms/${id}`,
    delete: (id: string) => `/firearms/${id}`,
  },
  maintenance: {
    list: '/maintenance',
    create: '/maintenance',
    update: (id: string) => `/maintenance/${id}`,
    delete: (id: string) => `/maintenance/${id}`,
  },
  profile: {
    get: '/profile',
    update: '/profile',
  },
} as const; 