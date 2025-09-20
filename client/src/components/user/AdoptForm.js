// src/components/user/AdoptForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdoptForm = () => {
  const { id } = useParams(); // ✅ petId from route
  const [pet, setPet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`/api/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        Swal.fire('Error', 'Pet not found', 'error');
        navigate('/user/pets');
      }
    };
    fetchPet();
  }, [id, navigate]);

  if (!pet) return <p>Loading pet...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    try {
      const token = localStorage.getItem('token');
      await axios.post(`/api/adoption/${id}/request`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire('Success', 'Your adoption request was submitted!', 'success');
      navigate('/user/myrequests');
    } catch (err) {
      Swal.fire(
        'Error',
        err.response?.data?.error || 'Something went wrong',
        'error'
      );
    }
  };

  return (
    <main className='main-content'>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Adopt {pet.name}
      </h2>

      <div className='form-wrapper'>
        <form onSubmit={handleSubmit} className='pet-form'>
          {/* First Name */}
          <div className='form-group'>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' id='firstName' name='firstName' required />
          </div>

          {/* Last Name */}
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name</label>
            <input type='text' id='lastName' name='lastName' required />
          </div>

          {/* Email */}
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' name='email' required />
          </div>

          {/* Phone */}
          <div className='form-group'>
            <label htmlFor='phone'>Phone</label>
            <input type='text' id='phone' name='phone' required />
          </div>

          {/* Address */}
          <div className='form-group'>
            <label htmlFor='address'>Address</label>
            <textarea id='address' name='address' rows='3' required></textarea>
          </div>

          {/* Message */}
          <div className='form-group'>
            <label htmlFor='message'>Message (optional)</label>
            <textarea
              id='message'
              name='message'
              rows='3'
              placeholder='Write something to us...'
            ></textarea>
          </div>

          {/* Actions */}
          <div className='form-actions'>
            <button type='submit' className='add-btn'>
              Submit Request
            </button>
            <button
              type='button'
              className='cancel-btn'
              onClick={() => navigate('/user/pets')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdoptForm;
