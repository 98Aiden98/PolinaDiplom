import { useEffect, useState } from 'react';
import { resultsApi } from '../api/results';
import EmptyState from '../components/EmptyState';

export default function Results() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    resultsApi.list().then((res) => setItems(res.data));
  }, []);

  return (
    <div className="container page">
      <h1>Результаты</h1>
      {items.length > 0 ? (
        <div className="table">
          <div className="table-row header">
            <div>Дата</div>
            <div>Соперник</div>
            <div>Счет</div>
            <div>Турнир</div>
          </div>
          {items.map((item) => (
            <div className="table-row" key={item._id}>
              <div>{new Date(item.dateTime).toLocaleDateString()}</div>
              <div>{item.opponent}</div>
              <div>
                {item.ourScore}:{item.theirScore}
              </div>
              <div>{item.competition || '-'}</div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Результатов пока нет"
          description="Как только сыграем первые матчи, они появятся здесь."
          badge="Результаты"
        />
      )}
    </div>
  );
}
