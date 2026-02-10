import api from './axios';

export const galleryApi = {
  list: () => api.get('/gallery'),
  upload: (formData) =>
    api.post('/gallery/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  remove: (id) => api.delete(`/gallery/${id}`)
};
