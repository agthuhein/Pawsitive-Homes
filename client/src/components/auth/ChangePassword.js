import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { currentPassword, newPassword, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return Swal.fire('Error!', 'Passwords do not match', 'error');
    }

    try {
      await axios.put(
        '/api/users/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');

      await Swal.fire({
        icon: 'success',
        title: 'Password Changed',
        text: 'Please log in again with your new password.',
        timer: 2000,
        showConfirmButton: false,
      });

      // ✅ Redirect to login
      navigate('/login');
    } catch (err) {
      const msg =
        err.response?.data?.msg || err.message || 'Something went wrong';
      Swal.fire('Error!', msg, 'error');
    }
  };

  return (
    <div className='form-container'>
      <form onSubmit={onSubmit}>
        <h2>Change Password</h2>

        <input
          type='password'
          name='currentPassword'
          value={currentPassword}
          onChange={onChange}
          placeholder='Current Password'
          required
        />

        <input
          type='password'
          name='newPassword'
          value={newPassword}
          onChange={onChange}
          placeholder='New Password (min 8 chars)'
          required
        />

        <input
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          onChange={onChange}
          placeholder='Confirm New Password'
          required
        />

        <button type='submit'>Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
