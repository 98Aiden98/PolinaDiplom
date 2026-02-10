import { useEffect, useState } from 'react';
import { scheduleApi } from '../api/schedule';
import EmptyState from '../components/EmptyState';

export default function Schedule() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    scheduleApi.list().then((res) => setItems(res.data));
  }, []);

  return (
    <div className="container page">
      <h1>Расписание</h1>
      {items.length > 0 ? (
        <div className="table">
          <div className="table-row header">
            <div>Дата</div>
            <div>Тип</div>
            <div>Соперник</div>
            <div>Место</div>
          </div>
          {items.map((item) => (
            <div className="table-row" key={item._id}>
              <div>{new Date(item.dateTime).toLocaleString()}</div>
              <div>{item.type === 'match' ? 'Матч' : 'Тренировка'}</div>
              <div>{item.opponent || '-'}</div>
              <div>{item.location}</div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Расписание пока пустое"
          description="План тренировок и матчей появится здесь."
          badge="Расписание"
        />
      )}
    </div>
  );
}
