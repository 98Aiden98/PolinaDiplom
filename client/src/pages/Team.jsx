import { useEffect, useState } from 'react';
import { teamApi } from '../api/team';
import { API_BASE } from '../api/axios';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';

const resolveImage = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url}`;
};

export default function Team() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    teamApi.list().then((res) => setItems(res.data));
  }, []);

  return (
    <div className="container page">
      <h1>Команда</h1>
      {items.length > 0 ? (
        <div className="grid">
          {items.map((item) => (
            <Card key={item._id} title={item.fullName}>
              {item.photoUrl && <img className="avatar" src={resolveImage(item.photoUrl)} alt={item.fullName} />}
              <p>Позиция: {item.position}</p>
              {item.number !== undefined && <p>Номер: {item.number}</p>}
              {item.bio && <p>{item.bio}</p>}
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Состав пока не заполнен"
          description="Мы обновим список игроков в ближайшее время."
          badge="Команда"
        />
      )}
    </div>
  );
}
