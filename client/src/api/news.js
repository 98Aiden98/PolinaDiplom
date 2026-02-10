import api from './axios';

export const newsApi = {
  list: (page = 1, limit = 5) => api.get(`/news?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/news/${id}`),
  getBySlug: (slug) => api.get(`/news/slug/${slug}`),
  uploadCover: (formData) =>
    api.post('/news/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  create: (payload) => api.post('/news', payload),
  update: (id, payload) => api.put(`/news/${id}`, payload),
  remove: (id) => api.delete(`/news/${id}`)
};
