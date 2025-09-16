import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const Register = () => {
  const navigate = useNavigate();

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
      alert('Password do not match');
    } else {
      try {
        //register({ name, email, password });
        const res = await axios.post('api/auth/register', {
          name,
          email,
          password,
        });
        console.log('Register response:', res.data);
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } catch (err) {
        console.error('Register error:', err.response?.data || err.message);
        alert(err.response?.data?.msg || 'Registration failed');
      }
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
