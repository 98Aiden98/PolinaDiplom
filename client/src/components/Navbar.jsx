import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          ФК Любители <span className="brand-dot">•</span>
        </div>
        <button
          className="nav-toggle"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Открыть меню"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/news">Новости</NavLink>
          <NavLink to="/team">Команда</NavLink>
          <NavLink to="/schedule">Расписание</NavLink>
          <NavLink to="/results">Результаты</NavLink>
          <NavLink to="/gallery">Галерея</NavLink>
          <NavLink to="/contacts">Контакты</NavLink>
        </nav>
      </div>
    </header>
  );
}
