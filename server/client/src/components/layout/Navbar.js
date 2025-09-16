import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  return (
    <header>
      <h1>
        <Link to='/' style={{ all: 'unset', cursor: 'pointer' }}>
          Pawsitive Home
        </Link>
      </h1>
      <nav id='nav-menu'>
        <Link to='/login' className='login'>
          Log in
        </Link>
        <Link to='/register' className='signup'>
          Sign up
        </Link>
      </nav>
      <button className='hamburger' id='hamburger'>
        ☰
      </button>
    </header>
  );
};

export default Navbar;
