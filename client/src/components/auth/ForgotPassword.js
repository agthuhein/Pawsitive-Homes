import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/forgot-password', { email });
      Swal.fire(
        'Success!',
        'Check your email for reset instructions',
        'success'
      );
    } catch (err) {
      Swal.fire(
        'Error!',
        err.response?.data?.msg || 'Something went wrong',
        'error'
      );
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type='submit'>Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
