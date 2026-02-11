import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      <div className={`admin-overlay ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`admin-sidebar ${open ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <h2>Админ-панель</h2>
          <button
            className="admin-close"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
          >
            ×
          </button>
        </div>
        <nav>
          <NavLink to="/admin">Дашборд</NavLink>
          <NavLink to="/admin/news">Новости</NavLink>
          <NavLink to="/admin/schedule">Расписание</NavLink>
          <NavLink to="/admin/results">Результаты</NavLink>
          <NavLink to="/admin/gallery">Галерея</NavLink>
          <NavLink to="/admin/team">Команда</NavLink>
        </nav>
        <button className="btn secondary" onClick={handleLogout}>Выйти</button>
      </aside>
      <main className="admin-main">
        <div className="admin-mobile-bar">
          <button
            className="admin-toggle"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
          >
            <span />
            <span />
            <span />
          </button>
          <span>Админ-панель</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
