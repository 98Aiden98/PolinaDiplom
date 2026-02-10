import { useEffect, useState } from 'react';
import { galleryApi } from '../api/gallery';
import { API_BASE } from '../api/axios';

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const load = () => galleryApi.list().then((res) => setItems(res.data));

  useEffect(() => {
    load();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!file) {
        setError('Выберите файл');
        return;
      }
      const formData = new FormData();
      formData.append('image', file);
      if (title) formData.append('title', title);
      await galleryApi.upload(formData);
      setFile(null);
      setTitle('');
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Ошибка');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить изображение?')) return;
    await galleryApi.remove(id);
    load();
  };

  return (
    <div>
      <h1>Галерея</h1>
      <form className="form" onSubmit={handleUpload}>
        <label>
          Заголовок
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Файл
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Загрузить</button>
      </form>

      <div className="gallery-grid admin-gallery">
        {items.map((item) => (
          <div key={item._id} className="gallery-card">
            <img src={`${API_BASE}${item.filePath}`} alt={item.title || 'Фото'} />
            <div className="gallery-card-footer">
              <span>{item.title || item.fileName}</span>
              <button className="btn small danger" onClick={() => handleDelete(item._id)}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
