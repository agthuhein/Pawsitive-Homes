import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import UserDashboard from './components/dashboard/UserDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import AdminPetManagement from './components/admin/AdminPetManagement';
import PetAdd from './components/admin/PetAdd';
import PetDetails from './components/admin/PetDetails';
import AdminAdoptMgmt from './components/admin/AdminAdoptionManagement';
import AdminUserMgmt from './components/admin/AdminUserManagement';

import './App.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<UserDashboard />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/pets' element={<AdminPetManagement />} />
          <Route path='/admin/pets/add' element={<PetAdd />} />
          <Route path='/admin/pets/details' element={<PetDetails />} />
          <Route path='/admin/adoptions' element={<AdminAdoptMgmt />} />
          <Route path='/admin/users' element={<AdminUserMgmt />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
