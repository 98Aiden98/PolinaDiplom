import { useEffect, useState } from 'react';
import { scheduleApi } from '../api/schedule';

const initialForm = { dateTime: '', type: 'training', opponent: '', location: '', notes: '' };

export default function AdminSchedule() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => scheduleApi.list().then((res) => setItems(res.data));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, dateTime: new Date(form.dateTime).toISOString() };
      if (editingId) {
        await scheduleApi.update(editingId, payload);
      } else {
        await scheduleApi.create(payload);
      }
      setForm(initialForm);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Ошибка');
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      dateTime: item.dateTime?.slice(0, 16),
      type: item.type,
      opponent: item.opponent || '',
      location: item.location,
      notes: item.notes || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить запись?')) return;
    await scheduleApi.remove(id);
    load();
  };

  return (
    <div>
      <h1>Расписание</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Дата и время
          <input
            type="datetime-local"
            value={form.dateTime}
            onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
            required
          />
        </label>
        <label>
          Тип
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="match">Матч</option>
            <option value="training">Тренировка</option>
          </select>
        </label>
        <label>
          Соперник
          <input value={form.opponent} onChange={(e) => setForm({ ...form, opponent: e.target.value })} />
        </label>
        <label>
          Место
          <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        </label>
        <label>
          Примечания
          <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
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
            }}
          >
            Отмена
          </button>
        )}
      </form>

      <div className="table">
        <div className="table-row header">
          <div>Дата</div>
          <div>Тип</div>
          <div>Место</div>
          <div>Действия</div>
        </div>
        {items.map((item) => (
          <div className="table-row" key={item._id}>
            <div>{new Date(item.dateTime).toLocaleString()}</div>
            <div>{item.type === 'match' ? 'Матч' : 'Тренировка'}</div>
            <div>{item.location}</div>
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
