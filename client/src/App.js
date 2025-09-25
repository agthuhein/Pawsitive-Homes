import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';
import { checkTokenExpiry } from './utils/auth';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AdminRoutes from './components/admin/routes/AdminRoutes';
import UserRoutes from './components/user/routes/UserRoutes';
import AdminRoute from './components/routing/AdminRoute';
import UserRoute from './components/routing/UserRoute';
import PetDetail from './components/user/PetDetail';
import Stories from './components/user/Stories';
import About from './components/user/About';
import Contact from './components/user/Contact';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import ChangePassword from './components/auth/ChangePassword';

import './App.css';

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    // check token expiry every 1 minute
    const tokenCheck = setInterval(() => {
      if (checkTokenExpiry()) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      }
    }, 60000);

    // axios interceptor
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    return () => clearInterval(tokenCheck);
  }, [navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/pets/:id' element={<PetDetail />} />
        <Route path='/stories' element={<Stories />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/user/change-password' element={<ChangePassword />} />
        <Route path='/admin/change-password' element={<ChangePassword />} />

        {/* User Routes */}
        <Route
          path='/user/*'
          element={
            <UserRoute>
              <UserRoutes />
            </UserRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path='/admin/*'
          element={
            <AdminRoute>
              <AdminRoutes />
            </AdminRoute>
          }
        />

        {/* 404 fallback */}
        <Route
          path='*'
          element={
            <h2 style={{ textAlign: 'center' }}>404 - Page Not Found</h2>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
