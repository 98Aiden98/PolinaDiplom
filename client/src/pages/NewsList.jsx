import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { newsApi } from '../api/news';
import { API_BASE } from '../api/axios';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';

const resolveImage = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url}`;
};

export default function NewsList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    newsApi.list(page, 5).then((res) => {
      setItems(res.data.items);
      setPages(res.data.pagination.pages || 1);
    });
  }, [page]);

  return (
    <div className="container page">
      <h1>Новости</h1>
      {items.length > 0 ? (
        <div className="grid">
          {items.map((item) => (
            <Card key={item._id} title={item.title} footer={<Link to={`/news/${item.slug}`}>Читать</Link>}>
              {item.coverImageUrl && (
                <img className="card-image" src={resolveImage(item.coverImageUrl)} alt={item.title} />
              )}
              <p>{item.content.slice(0, 200)}...</p>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Новостей пока нет"
          description="Проверьте позже — скоро появятся новые материалы."
          badge="Новости"
        />
      )}
      {items.length > 0 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            aria-label="Назад"
          >
            <span className="arrow left" aria-hidden="true" />
          </button>
          <div className="page-indicator">
            Страница <strong>{page}</strong> из {pages}
          </div>
          <button
            className="page-btn"
            disabled={page >= pages}
            onClick={() => setPage((p) => p + 1)}
            aria-label="Вперед"
          >
            <span className="arrow right" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
