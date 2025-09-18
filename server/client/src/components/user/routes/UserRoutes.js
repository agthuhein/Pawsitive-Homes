import { Routes, Route } from 'react-router-dom';
import UserDashboard from '../../dashboard/UserDashboard';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='dashboard' element={<UserDashboard />} />
    </Routes>
  );
};

export default UserRoutes;
