import axios from 'axios';
import { startLoading, stopLoading } from './loadingStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_BASE = API_URL.replace(/\/?api\/?$/, '');

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use(
  (config) => {
    startLoading();
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    stopLoading();
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    stopLoading();
    return response;
  },
  (error) => {
    stopLoading();
    return Promise.reject(error);
  }
);

export default api;
