import { useEffect, useState } from 'react';
import { resultsApi } from '../api/results';

const initialForm = {
  dateTime: '',
  opponent: '',
  ourScore: 0,
  theirScore: 0,
  competition: '',
  notes: ''
};

export default function AdminResults() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = () => resultsApi.list().then((res) => setItems(res.data));

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        ...form,
        dateTime: new Date(form.dateTime).toISOString(),
        ourScore: Number(form.ourScore),
        theirScore: Number(form.theirScore)
      };
      if (editingId) {
        await resultsApi.update(editingId, payload);
      } else {
        await resultsApi.create(payload);
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
      opponent: item.opponent,
      ourScore: item.ourScore,
      theirScore: item.theirScore,
      competition: item.competition || '',
      notes: item.notes || ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Удалить результат?')) return;
    await resultsApi.remove(id);
    load();
  };

  return (
    <div>
      <h1>Результаты</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Дата
          <input
            type="datetime-local"
            value={form.dateTime}
            onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
            required
          />
        </label>
        <label>
          Соперник
          <input value={form.opponent} onChange={(e) => setForm({ ...form, opponent: e.target.value })} required />
        </label>
        <label>
          Наши
          <input
            type="number"
            min="0"
            value={form.ourScore}
            onChange={(e) => setForm({ ...form, ourScore: e.target.value })}
            required
          />
        </label>
        <label>
          Их
          <input
            type="number"
            min="0"
            value={form.theirScore}
            onChange={(e) => setForm({ ...form, theirScore: e.target.value })}
            required
          />
        </label>
        <label>
          Турнир
          <input value={form.competition} onChange={(e) => setForm({ ...form, competition: e.target.value })} />
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
          <div>Соперник</div>
          <div>Счет</div>
          <div>Действия</div>
        </div>
        {items.map((item) => (
          <div className="table-row" key={item._id}>
            <div>{new Date(item.dateTime).toLocaleDateString()}</div>
            <div>{item.opponent}</div>
            <div>
              {item.ourScore}:{item.theirScore}
            </div>
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
