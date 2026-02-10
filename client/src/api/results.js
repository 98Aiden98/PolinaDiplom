import api from './axios';

export const resultsApi = {
  list: () => api.get('/results'),
  create: (payload) => api.post('/results', payload),
  update: (id, payload) => api.put(`/results/${id}`, payload),
  remove: (id) => api.delete(`/results/${id}`)
};
