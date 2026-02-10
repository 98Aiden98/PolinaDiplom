import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand">
          ФК Любители <span className="brand-dot">•</span>
        </div>
        <nav className="nav-links">
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
