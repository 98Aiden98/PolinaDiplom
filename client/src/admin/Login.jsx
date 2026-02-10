import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await authApi.login({ username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err?.response?.data?.message || 'Ошибка входа');
    }
  };

  return (
    <div className="container page narrow">
      <h1>Вход в админ-панель</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Логин
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Пароль
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        {error && <div className="error">{error}</div>}
        <button className="btn" type="submit">Войти</button>
      </form>
    </div>
  );
}
