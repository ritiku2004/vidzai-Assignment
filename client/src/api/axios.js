import axios from 'axios';
import { getToken, logout } from './authClient';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// attach token if available
api.interceptors.request.use(config => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// handle 401 globally
api.interceptors.response.use(
  r => r,
  err => {
    if (err.response && err.response.status === 401) {
      // token invalid/expired: clear
      logout();
    }
    return Promise.reject(err);
  }
);

export default api;
