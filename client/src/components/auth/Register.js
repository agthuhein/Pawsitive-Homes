import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password2: '',
  });

  const { firstName, lastName, email, phone, address, password, password2 } =
    formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
      });
    } else if (password.length < 8) {
      Swal.fire({
        icon: 'warning',
        title: 'Weak Password',
        text: 'Password must be at least 8 characters long.',
      });
    } else {
      try {
        const res = await axios.post('/api/auth/register', {
          firstName,
          lastName,
          email,
          phone,
          address,
          password,
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.user.role);

        await Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your account has been created successfully.',
        });

        navigate('/user/dashboard');
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text:
            err.response?.data?.msg ||
            'Something went wrong. Please try again.',
        });
      }
    }
  };

  return (
    <Fragment>
      <div className='form-container'>
        <form onSubmit={onSubmit}>
          <h2>Create your account</h2>

          <input
            type='text'
            placeholder='First Name'
            name='firstName'
            value={firstName}
            onChange={onChange}
            required
          />
          <input
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={lastName}
            onChange={onChange}
            required
          />
          <input
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
          <input
            type='text'
            placeholder='Phone Number'
            name='phone'
            value={phone}
            onChange={onChange}
          />
          <input
            type='text'
            placeholder='Address'
            name='address'
            value={address}
            onChange={onChange}
          />
          <input
            type='password'
            placeholder='Password (min 8 characters)'
            name='password'
            value={password}
            onChange={onChange}
            required
          />
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={onChange}
            required
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
