import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // ✅ add this

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      // ✅ Success Alert
      await Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome back, ${res.data.user.name}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      // ✅ Redirect after alert
      if (res.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      // ✅ Error Alert
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data?.msg || 'Something went wrong',
      });
    }
  };

  return (
    <Fragment>
      <div className='form-container'>
        <form onSubmit={onSubmit}>
          <h2>More than 1000+ pets waiting for you</h2>
          <input
            type='email'
            placeholder='Enter your email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
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
