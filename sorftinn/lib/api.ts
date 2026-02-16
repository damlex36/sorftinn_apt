// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds – prevents hanging forever
});

// Optional: Add request interceptor (very useful later for auth tokens)
api.interceptors.request.use(
  (config) => {
    // Example: add JWT or session token from localStorage/cookies later
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can show toast notifications here later
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;


/**
 * SorftInn Hotel App
 * © 2026 Damola
 * Licensed under MIT
 */