import { Navigate } from 'react-router-dom';

const UserRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  if (role !== 'user') {
    if (role === 'admin') {
      return <Navigate to='/admin/dashboard' replace />;
    }
    return <Navigate to='/' replace />;
  }

  return children;
};

export default UserRoute;
