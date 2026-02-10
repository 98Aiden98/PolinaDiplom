import api from './axios';

export const scheduleApi = {
  list: () => api.get('/schedule'),
  create: (payload) => api.post('/schedule', payload),
  update: (id, payload) => api.put(`/schedule/${id}`, payload),
  remove: (id) => api.delete(`/schedule/${id}`)
};
