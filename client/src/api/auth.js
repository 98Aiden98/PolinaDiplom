import api from './axios';

export const authApi = {
  login: (payload) => api.post('/auth/login', payload),
  seedAdmin: (payload) => api.post('/auth/seed-admin', payload)
};
