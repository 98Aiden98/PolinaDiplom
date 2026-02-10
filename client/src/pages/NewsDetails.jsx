import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { newsApi } from '../api/news';
import { API_BASE } from '../api/axios';

const resolveImage = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url}`;
};

export default function NewsDetails() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    newsApi
      .getBySlug(slug)
      .then((res) => setItem(res.data))
      .catch(() => setError('Новость не найдена'));
  }, [slug]);

  if (error) {
    return (
      <div className="container page">
        <p>{error}</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container page">
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="container page">
      <h1>{item.title}</h1>
      {item.coverImageUrl && <img className="cover" src={resolveImage(item.coverImageUrl)} alt={item.title} />}
      <div className="content">
        {item.content.split('\n').map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
      <div className="meta">Опубликовано: {new Date(item.createdAt).toLocaleDateString()}</div>
    </div>
  );
}
