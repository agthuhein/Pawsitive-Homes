import { Routes, Route } from 'react-router-dom';

import UserDashboard from '../../dashboard/UserDashboard';
import PetGallery from '../PetGallery';
import Donate from '../Donate';
import AdoptForm from '../AdoptForm';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<UserDashboard />} />
      <Route path='/pets' element={<PetGallery />} />
      <Route path='/donate' element={<Donate />} />
      <Route path='/pets/:id/adopt' element={<AdoptForm />} />
    </Routes>
  );
};

export default UserRoutes;
