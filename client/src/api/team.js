import api from './axios';

export const teamApi = {
  list: () => api.get('/team'),
  uploadPhoto: (formData) =>
    api.post('/team/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  create: (payload) => api.post('/team', payload),
  update: (id, payload) => api.put(`/team/${id}`, payload),
  remove: (id) => api.delete(`/team/${id}`)
};
