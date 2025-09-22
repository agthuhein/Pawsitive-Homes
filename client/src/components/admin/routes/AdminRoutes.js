// src/components/admin/routes/AdminRoutes.js
import { Routes, Route } from 'react-router-dom';

import AdminDashboard from '../../dashboard/AdminDashboard';
import AdminPetManagement from '../AdminPetManagement';
import PetAdd from '../PetAdd';
import AdminAdoptMgmt from '../AdminAdoptionManagement';
import AdminUserMgmt from '../AdminUserManagement';
import PetEdit from '../PetEdit';
import AdminDonations from '../AdminDonations';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='dashboard' element={<AdminDashboard />} />
      <Route path='pets' element={<AdminPetManagement />} />
      <Route path='pets/add' element={<PetAdd />} />
      <Route path='pets/edit/:id' element={<PetEdit />} />
      <Route path='adoptions' element={<AdminAdoptMgmt />} />
      <Route path='users' element={<AdminUserMgmt />} />

      <Route path='/donations' element={<AdminDonations />} />
    </Routes>
  );
};

export default AdminRoutes;
