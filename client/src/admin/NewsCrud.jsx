import { useEffect, useState } from 'react';
import { newsApi } from '../api/news';
import { API_BASE } from '../api/axios';

const initialForm = { title: '', content: '', coverImageUrl: '' };

export default function AdminNews() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const resolveImage = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE}${url}`;
  };

  const load = () => {
    newsApi.list(1, 50).then((res) => setItems(res.data.items));
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!file) {
      setPreview('');
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      let coverImageUrl = form.coverImageUrl;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const uploadRes = await newsApi.uploadCover(formData);
        coverImageUrl = uploadRes.data.filePath;
      }
      const payload = { ...form, coverImageUrl };
      if (editingId) {
        await newsApi.update(editingId, payload);
      } else {
        await newsApi.create(payload);
      }
      setForm(initialForm);
      setEditingId(null);
      setFile(null);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Ошибка');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      content: item.content,
      coverImageUrl: item.coverImageUrl || ''
    });
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить новость?')) return;
    await newsApi.remove(id);
    load();
  };

  return (
    <div>
      <h1>Новости</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Заголовок
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        </label>
        <label>
          Контент
          <textarea
            rows="5"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
        </label>
        <label>
          Обложка (изображение)
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        {(preview || form.coverImageUrl) && (
          <img
            className="preview-image"
            src={preview || resolveImage(form.coverImageUrl)}
            alt="Обложка"
          />
        )}
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">{editingId ? 'Сохранить' : 'Создать'}</button>
        {editingId && (
          <button
            type="button"
            className="btn secondary"
            onClick={() => {
              setEditingId(null);
              setForm(initialForm);
              setFile(null);
            }}
          >
            Отмена
          </button>
        )}
      </form>

      <div className="table">
        <div className="table-row header three">
          <div>Заголовок</div>
          <div>Дата</div>
          <div>Действия</div>
        </div>
        {items.map((item) => (
          <div className="table-row three" key={item._id}>
            <div>{item.title}</div>
            <div>{new Date(item.createdAt).toLocaleDateString()}</div>
            <div className="actions">
              <button className="btn small" onClick={() => handleEdit(item)}>Редактировать</button>
              <button className="btn small danger" onClick={() => handleDelete(item._id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
