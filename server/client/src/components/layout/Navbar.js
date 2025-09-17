import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header>
      <h1>
        <Link to='/' style={{ all: 'unset', cursor: 'pointer' }}>
          Pawsitive Home
        </Link>
      </h1>

      <nav id='nav-menu'>
        {!token ? (
          <>
            <Link to='/login' className='login'>
              Log in
            </Link>
            <Link to='/register' className='signup'>
              Sign up
            </Link>
          </>
        ) : role === 'admin' ? (
          <>
            <Link to='/admin/dashboard'>Admin Dashboard</Link>
            <Link to='/admin/pets'>Manage Pets</Link>
            <Link to='/admin/users'>Manage Adoptions</Link>
            <Link to='/admin/users'>Manage Users</Link>
            <Link to='/' onClick={handleLogout} className='logout'>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to='/dashboard'>My Dashboard</Link>
            <button
              onClick={handleLogout}
              style={{ background: 'red', color: 'white', borderRadius: '6px' }}
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <button className='hamburger' id='hamburger'>
        ☰
      </button>
    </header>
  );
};

export default Navbar;
