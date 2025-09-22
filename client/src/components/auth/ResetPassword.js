import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const { token } = useParams(); // get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Passwords do not match',
        text: 'Please re-enter your password.',
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(`/api/auth/reset-password/${token}`, { password });

      Swal.fire({
        icon: 'success',
        title: 'Password Reset',
        text: 'Your password has been reset successfully!',
      }).then(() => {
        navigate('/login');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: err.response?.data?.msg || 'Invalid or expired token',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='main-content'>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Reset Password
      </h2>

      <div className='form-wrapper'>
        <form onSubmit={handleSubmit} className='profile-form'>
          {/* New Password */}
          <div className='form-group'>
            <label htmlFor='password'>New Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter new password'
              required
            />
          </div>

          {/* Confirm Password */}
          <div className='form-group'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder='Confirm new password'
              required
            />
          </div>

          {/* Buttons */}
          <div className='form-actions'>
            <button type='submit' className='save-btn' disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            <button
              type='button'
              className='cancel-btn'
              onClick={() => navigate('/login')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
