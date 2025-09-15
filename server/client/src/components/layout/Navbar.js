import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  return (
    <header>
      <h1>Pawsitive Home</h1>
      <nav id='nav-menu'>
        <a href='login.html' class='login'>
          Log in
        </a>
        <a href='register.html' class='signup'>
          Sign up
        </a>
      </nav>
      <button class='hamburger' id='hamburger'>
        ☰
      </button>
    </header>
  );
};

export default Navbar;
