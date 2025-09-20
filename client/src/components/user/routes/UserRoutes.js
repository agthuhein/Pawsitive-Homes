import { Routes, Route } from 'react-router-dom';

import UserDashboard from '../../dashboard/UserDashboard';
import PetGallery from '../PetGallery';
import Donate from '../Donate';
import AdoptForm from '../AdoptForm';
import UserRequests from '../UserRequest';
import SuccessPayment from '../SuccessPayment';
import CancelPayment from '../CancelPayment';

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/dashboard' element={<UserDashboard />} />
      <Route path='/pets' element={<PetGallery />} />
      <Route path='/donate' element={<Donate />} />
      <Route path='/pets/:id/adopt' element={<AdoptForm />} />
      <Route path='/myrequests' element={<UserRequests />} />
      <Route path='/success-payment' element={<SuccessPayment />} />
      <Route path='/cancel-payment' element={<CancelPayment />} />
    </Routes>
  );
};

export default UserRoutes;
