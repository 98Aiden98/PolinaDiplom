import { Navigate, useLocation } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminLogin from './Login';

export default function AdminGate() {
  const token = localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    if (location.pathname !== '/admin') {
      return <Navigate to="/admin" replace />;
    }
    return <AdminLogin />;
  }

  return <AdminLayout />;
}
