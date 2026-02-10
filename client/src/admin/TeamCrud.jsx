import { useEffect, useState } from 'react';
import { teamApi } from '../api/team';
import { API_BASE } from '../api/axios';

const initialForm = { fullName: '', position: '', number: '', photoUrl: '', bio: '' };

export default function AdminTeam() {
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

  const load = () => teamApi.list().then((res) => setItems(res.data));

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
      let photoUrl = form.photoUrl;
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const uploadRes = await teamApi.uploadPhoto(formData);
        photoUrl = uploadRes.data.filePath;
      }
      const payload = {
        ...form,
        photoUrl,
        number: form.number === '' ? undefined : Number(form.number)
      };
      if (editingId) {
        await teamApi.update(editingId, payload);
      } else {
        await teamApi.create(payload);
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
      fullName: item.fullName,
      position: item.position,
      number: item.number ?? '',
      photoUrl: item.photoUrl || '',
      bio: item.bio || ''
    });
    setFile(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить игрока?')) return;
    await teamApi.remove(id);
    load();
  };

  return (
    <div>
      <h1>Команда</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          ФИО
          <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />
        </label>
        <label>
          Позиция
          <input value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required />
        </label>
        <label>
          Номер
          <input type="number" value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} />
        </label>
        <label>
          Фото (изображение)
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        </label>
        {(preview || form.photoUrl) && (
          <img
            className="preview-image"
            src={preview || resolveImage(form.photoUrl)}
            alt="Фото игрока"
          />
        )}
        <label>
          Bio
          <input value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </label>
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
        <div className="table-row header">
          <div>ФИО</div>
          <div>Позиция</div>
          <div>Номер</div>
          <div>Действия</div>
        </div>
        {items.map((item) => (
          <div className="table-row" key={item._id}>
            <div>{item.fullName}</div>
            <div>{item.position}</div>
            <div>{item.number ?? '-'}</div>
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
