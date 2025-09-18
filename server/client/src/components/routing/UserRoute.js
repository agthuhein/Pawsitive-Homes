// src/components/routing/UserRoute.js
import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (role !== 'user') {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default UserRoute;
