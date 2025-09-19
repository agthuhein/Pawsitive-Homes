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
      navigate('/user/adoptions');
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
      <h2>Adopt {pet.name}</h2>
      <form onSubmit={handleSubmit} className='adopt-form'>
        <div>
          <label>First Name</label>
          <input type='text' name='firstName' required />
        </div>
        <div>
          <label>Last Name</label>
          <input type='text' name='lastName' required />
        </div>
        <div>
          <label>Email</label>
          <input type='email' name='email' required />
        </div>
        <div>
          <label>Phone</label>
          <input type='text' name='phone' required />
        </div>
        <div>
          <label>Address</label>
          <textarea name='address' required></textarea>
        </div>
        <div>
          <label>Message (optional)</label>
          <textarea name='message'></textarea>
        </div>
        <button type='submit' className='add-btn'>
          Submit Request
        </button>
      </form>
    </main>
  );
};

export default AdoptForm;
