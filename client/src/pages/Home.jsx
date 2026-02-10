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

export default function Home() {
  const [latest, setLatest] = useState([]);

  useEffect(() => {
    newsApi.list(1, 3).then((res) => setLatest(res.data.items)).catch(() => setLatest([]));
  }, []);

  return (
    <div className="container page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">Любительская команда города</span>
          <h1>ФК Любители — играем, развиваемся, побеждаем</h1>
          <p className="hero-subtitle">
            Мы объединяем любителей футбола, проводим тренировки и участвуем в городских турнирах.
            Присоединяйтесь к нам и следите за новостями клуба.
          </p>
          <div className="hero-actions">
            <Link to="/schedule" className="btn">Ближайшие матчи</Link>
            <Link to="/team" className="btn ghost">Состав команды</Link>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-stat">
            <span>12+</span>
            матчей за сезон
          </div>
          <div className="hero-stat">
            <span>3</span>
            тренировки в неделю
          </div>
          <div className="hero-stat">
            <span>20</span>
            игроков в составе
          </div>
        </div>
      </section>

      <section>
        <div className="section-header">
          <h2>Последние новости</h2>
          <Link to="/news">Все новости</Link>
        </div>
        {latest.length > 0 ? (
          <div className="grid">
            {latest.map((item) => (
              <Card key={item._id} title={item.title} footer={<Link to={`/news/${item.slug}`}>Читать</Link>}>
                {item.coverImageUrl && (
                  <img className="card-image" src={resolveImage(item.coverImageUrl)} alt={item.title} />
                )}
                <p>{item.content.slice(0, 160)}...</p>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Новостей пока нет"
            description="Мы скоро опубликуем свежие новости клуба."
            badge="Новости"
          />
        )}
      </section>
    </div>
  );
}
