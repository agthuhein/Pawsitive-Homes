import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      //setAlert('Password do not match', 'danger');
    } else {
      //register({ name, email, password });
    }
  };

  return (
    <Fragment>
      <div className='form-container'>
        <form onSubmit={(e) => onSubmit(e)}>
          <h2>Create your account</h2>
          <input
            type='text'
            placeholder='Full Name'
            value={name}
            onChange={(e) => onChange(e)}
            name='name'
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
          />
          <button type='submit'>Register</button>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
            Already have an account?{' '}
            <Link to='/login' style={{ color: '#1a083d', fontWeight: 'bold' }}>
              Log In
            </Link>
          </p>
        </form>
      </div>
    </Fragment>
  );
};

export default Register;
