import React, { Fragment } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Login = () => {
  return (
    <Fragment>
      <div className='form-container'>
        <form>
          <h2>More than 1000+ pets waiting for you</h2>
          <input type='email' placeholder='Enter your email' />
          <input type='password' placeholder='Password' />
          <button type='submit'>Continue</button>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
            Don't have an account?{' '}
            <Link
              to='/register'
              style={{ color: '#1a083d', fontWeight: 'bold' }}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Login;
