import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import AdminRoutes from './components/admin/routes/AdminRoutes';
import UserRoutes from './components/user/routes/UserRoutes';

import AdminRoute from './components/routing/AdminRoute';
import UserRoute from './components/routing/UserRoute';

import './App.css';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* User Routes (protected) */}
        <Route
          path='/user/*'
          element={
            <UserRoute>
              <UserRoutes />
            </UserRoute>
          }
        />

        {/* Admin Routes (protected) */}
        <Route
          path='/admin/*'
          element={
            <AdminRoute>
              <AdminRoutes />
            </AdminRoute>
          }
        />

        {/* Fallback / 404 Page */}
        <Route
          path='*'
          element={
            <h2 style={{ textAlign: 'center' }}>404 - Page Not Found</h2>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
