// src/components/routing/UserRoute.js
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (role !== 'user') {
    // ✅ redirect admin to their dashboard
    if (role === 'admin') {
      return <Navigate to='/admin/dashboard' replace />;
    }
    // fallback for unknown role
    return <Navigate to='/' replace />;
  }

  return children;
};

export default UserRoute;
