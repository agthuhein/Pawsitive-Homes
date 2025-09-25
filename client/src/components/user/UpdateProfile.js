import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const token = localStorage.getItem('token');
  const { firstName, lastName, email, phone, address } = formData;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          firstName: res.data.firstName || '',
          lastName: res.data.lastName || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          address: res.data.address || '',
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        Swal.fire('Error', 'Could not load profile details', 'error');
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        '/api/users/me',
        { firstName, lastName, phone, address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire('Success!', 'Profile updated successfully 🎉', 'success').then(
        () => navigate('/user/dashboard')
      );
    } catch (err) {
      Swal.fire(
        'Error!',
        err.response?.data?.msg || 'Something went wrong',
        'error'
      );
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <main className='main-content'>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Update Profile
      </h2>

      <div className='form-wrapper'>
        <form onSubmit={onSubmit} className='profile-form'>
          {/* First Name */}
          <div className='form-group'>
            <label htmlFor='firstName'>First Name</label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={firstName}
              onChange={onChange}
              required
            />
          </div>

          {/* Last Name */}
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name</label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              value={lastName}
              onChange={onChange}
              required
            />
          </div>

          {/* Email (not editable) */}
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' value={email} disabled />
            <small className='small-style'>Email cannot be changed</small>
          </div>

          {/* Phone */}
          <div className='form-group'>
            <label htmlFor='phone'>Phone</label>
            <input
              type='text'
              id='phone'
              name='phone'
              value={phone}
              onChange={onChange}
              placeholder='Enter your phone number'
            />
          </div>

          {/* Address */}
          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <textarea
              id='address'
              name='address'
              rows='3'
              value={address}
              onChange={onChange}
              placeholder='Enter your address'
            />
          </div>

          {/* Buttons */}
          <div className='form-actions'>
            <button type='submit' className='save-btn'>
              Save Changes
            </button>
            <button
              type='button'
              className='cancel-btn'
              onClick={() => navigate('/user/dashboard')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default UpdateProfile;
