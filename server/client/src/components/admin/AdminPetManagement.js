import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminPetManagement = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get('/api/pets/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(res.data);
      } catch (err) {
        console.error('Error fetching pets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [token]);

  //Pet delete function
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/pets/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(pets.filter((pet) => pet._id !== id));
      } catch (err) {
        console.error('Error deleting pet:', err);
      }
    }
  };

  if (loading) return <p>Loading pets...</p>;

  return (
    <main className='main-content'>
      <h2>Manage Pets</h2>
      <button className='add-btn' onClick={() => navigate('/admin/pets/add')}>
        + Add New Pet
      </button>
      <table className='admin-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Age</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* <tbody>
            {pets.map((pet) => (
              <tr>
                <td>{pet._id.slice(-6).toUpperCase()}</td>
                <td>
                  <img
                    src={`http://localhost:4000${pet.image}`}
                    alt={pet.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </td>
                <td>{pet.name}</td>
                <td>{pet.age}</td>
                <td>{pet.breed}</td>
                <td>{pet.status}</td>
                <td>
                  <button className='details-btn'>Details</button>
                  <button className='edit-btn'>Edit</button>
                  <button className='delete-btn'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody> */}
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td data-label='ID'>
                {' '}
                {(pet.category?.name.toUpperCase() || 'PET') +
                  '_' +
                  pet._id.slice(-6).toUpperCase()}
              </td>
              <td data-label='Photo'>
                <img
                  src={`http://localhost:4000${pet.image}`}
                  alt={pet.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </td>
              <td data-label='Name'>{pet.name}</td>
              <td data-label='Age'>{pet.age}</td>
              <td data-label='Type'>{pet.breed}</td>
              <td data-label='Status'>{pet.status}</td>
              <td data-label='Actions'>
                <button
                  className='details-btn'
                  onClick={() => navigate(`/admin/pets/${pet._id}`)}
                >
                  Details
                </button>
                <button
                  className='edit-btn'
                  onClick={() => navigate(`/admin/pets/edit/${pet._id}`)}
                >
                  Edit
                </button>
                <button
                  className='delete-btn'
                  onClick={() => handleDelete(pet._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default AdminPetManagement;
