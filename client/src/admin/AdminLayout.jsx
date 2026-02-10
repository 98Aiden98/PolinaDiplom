import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2>Админ-панель</h2>
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
        <Outlet />
      </main>
    </div>
  );
}
