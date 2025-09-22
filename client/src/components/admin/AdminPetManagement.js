import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AdminPetManagement = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(5);

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

  // ✅ Pet Details popup
  const handleDetails = (pet) => {
    Swal.fire({
      title: `${pet.name} (${pet.gender === 'male' ? '♂ Male' : '♀ Female'})`,
      html: `
        <img 
          src="http://localhost:4000${pet.image}" 
          alt="${pet.name}" 
          style="width:200px; height:200px; object-fit:cover; border-radius:10px; margin-bottom:10px"
        />
        <p><strong>Age:</strong> ${pet.age}</p>
        <p><strong>Breed:</strong> ${pet.breed}</p>
        <p><strong>Color:</strong> ${pet.color}</p>
        <p><strong>Status:</strong> ${pet.status}</p>
        <p><strong>Category:</strong> ${pet.category?.name || 'N/A'}</p>
        <p><strong>Description:</strong> ${pet.description}</p>
        <p><strong>Traits:</strong> ${
          pet.traits && pet.traits.length > 0
            ? pet.traits.join(', ')
            : 'No traits added'
        }</p>
        ${
          pet.additionalImages && pet.additionalImages.length > 0
            ? `<hr/><p><strong>Additional Images:</strong></p>
               ${pet.additionalImages
                 .map(
                   (img) =>
                     `<img src="http://localhost:4000${img}" 
                       style="width:80px; height:80px; object-fit:cover; border-radius:8px; margin:5px" />`
                 )
                 .join('')}`
            : ''
        }
      `,
      confirmButtonText: 'Close',
      width: '600px',
    });
  };

  // ✅ Safe delete logic
  const handleDelete = async (id, status) => {
    if (status === 'pending') {
      Swal.fire(
        'Not Allowed',
        'This pet has a pending adoption request. Please resolve it before deleting.',
        'warning'
      );
      return;
    }

    if (status === 'adopted') {
      Swal.fire(
        'Not Allowed',
        'This pet has already been adopted and cannot be deleted.',
        'error'
      );
      return;
    }

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

        const updatedPets = pets.filter((pet) => pet._id !== id);
        setPets(updatedPets);

        const totalPages = Math.ceil(updatedPets.length / petsPerPage);
        if (currentPage > totalPages) {
          setCurrentPage(totalPages || 1);
        }

        Swal.fire('Deleted!', 'Pet has been removed.', 'success');
      } catch (err) {
        console.error('Error deleting pet:', err);
        Swal.fire('Error', 'Failed to delete pet', 'error');
      }
    }
  };

  // ✅ Filtering
  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory
      ? pet.category?.name === filterCategory
      : true;
    const matchesStatus = filterStatus ? pet.status === filterStatus : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // ✅ Pagination
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);

  if (loading) return <p>Loading pets...</p>;

  return (
    <main className='main-content'>
      <h2>Manage Pets</h2>

      {/* Controls Row */}
      <div className='controls-row'>
        <button className='add-btn' onClick={() => navigate('/admin/pets/add')}>
          + Add New Pet
        </button>

        <div className='filters'>
          <input
            type='text'
            placeholder='Search pets...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value=''>All Categories</option>
            <option value='Dog'>Dog</option>
            <option value='Cat'>Cat</option>
            <option value='Other'>Other</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value=''>All Status</option>
            <option value='available'>Available</option>
            <option value='adopted'>Adopted</option>
            <option value='pending'>Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <table className='admin-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Age</th>
            <th>Type</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPets.map((pet) => (
            <tr key={pet._id}>
              <td data-label='ID'>
                <code className='pet-id'>
                  {(pet.category?.name.toUpperCase() || 'PET') +
                    '_' +
                    pet._id.slice(-6).toUpperCase()}
                </code>
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
              <td data-label='Category'>{pet.category?.name}</td>
              <td data-label='Status'>
                <span
                  className={`badge ${
                    pet.status === 'available'
                      ? 'badge-available'
                      : pet.status === 'adopted'
                      ? 'badge-adopted'
                      : 'badge-pending'
                  }`}
                >
                  {pet.status}
                </span>
              </td>

              <td data-label='Actions'>
                <div className='table-actions'>
                  <button
                    className='details-btn'
                    onClick={() => handleDetails(pet)}
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
                    onClick={() => handleDelete(pet._id, pet.status)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {currentPets.length === 0 && (
            <tr>
              <td colSpan='8' style={{ textAlign: 'center', padding: '20px' }}>
                No pets found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='pagination'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default AdminPetManagement;
