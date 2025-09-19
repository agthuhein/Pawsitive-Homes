import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PetEdit = () => {
  const { id } = useParams(); // get pet id from URL
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error('Error fetching pet:', err);
        Swal.fire('Error', 'Could not load pet details', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!pet) return <p>Pet not found</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const traitsInput = e.target.traits.value;
    if (traitsInput) {
      const traitsArray = traitsInput.split(',').map((t) => t.trim());
      formData.delete('traits'); // remove plain string version
      formData.append('traits', JSON.stringify(traitsArray));
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `http://localhost:4000/api/pets/${pet._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire('Success!', 'Pet updated successfully 🎉', 'success').then(
        () => {
          navigate('/admin/pets');
        }
      );
    } catch (err) {
      Swal.fire(
        'Error!',
        err.response?.data?.error || 'Something went wrong!',
        'error'
      );
    }
  };

  return (
    <main className='main-content'>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Edit {pet.name}
      </h2>

      <div className='form-wrapper'>
        <form
          onSubmit={handleSubmit}
          className='pet-form'
          encType='multipart/form-data'
        >
          {/* Name */}
          <div className='form-group'>
            <label htmlFor='name'>Pet Name</label>
            <input
              type='text'
              id='name'
              name='name'
              defaultValue={pet.name}
              required
            />
          </div>

          {/* Age */}
          <div className='form-group'>
            <label htmlFor='age'>Age</label>
            <input
              type='text'
              id='age'
              name='age'
              defaultValue={pet.age}
              required
            />
          </div>

          {/* Breed */}
          <div className='form-group'>
            <label htmlFor='breed'>Breed</label>
            <input
              type='text'
              id='breed'
              name='breed'
              defaultValue={pet.breed}
              required
            />
          </div>

          {/* Gender */}
          <div className='form-group'>
            <label htmlFor='gender'>Gender</label>
            <select
              id='gender'
              name='gender'
              defaultValue={pet.gender}
              disabled
            >
              <option value='male'>Male ♂</option>
              <option value='female'>Female ♀</option>
            </select>
            <small className='small-style'>Gender cannot be changed.</small>
          </div>

          {/* Color */}
          <div className='form-group'>
            <label htmlFor='color'>Color</label>
            <input
              type='text'
              id='color'
              name='color'
              defaultValue={pet.color}
              required
            />
          </div>

          {/* Description */}
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              rows='3'
              defaultValue={pet.description}
              required
            />
          </div>

          {/* Category */}
          <div className='form-group'>
            <label htmlFor='category'>Category</label>
            <select
              id='category'
              name='category'
              defaultValue={pet.category?._id}
              disabled
            >
              <option value='dog'>Dog</option>
              <option value='cat'>Cat</option>
              <option value='other'>Other</option>
            </select>
            <small className='small-style'>Category cannot be changed.</small>
          </div>

          {/* Status */}
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select
              id='status'
              name='status'
              defaultValue={pet.status}
              disabled
            >
              <option value='available'>Available</option>
              <option value='adopted'>Adopted</option>
              <option value='pending'>Pending</option>
            </select>
            <small className='small-style'>Status cannot be changed.</small>
          </div>

          {/* Traits */}
          <div className='form-group'>
            <label htmlFor='traits'>Traits</label>
            <input
              type='text'
              id='traits'
              name='traits'
              defaultValue={pet.traits?.join(', ')} // show as comma separated
              placeholder='e.g. Friendly, Best with kids, Playful'
            />
          </div>

          {/* Image Upload */}
          <div className='form-group'>
            <label htmlFor='image'>Main Image</label>
            <input type='file' id='image' name='image' accept='image/*' />
            <small className='small-style'>Leave empty if no change.</small>
          </div>

          {/* Additional Images */}
          <div className='form-group'>
            <label htmlFor='additionalImages'>Additional Images</label>
            <input
              type='file'
              id='additionalImages'
              name='additionalImages'
              accept='image/*'
              multiple
            />
            <small className='small-style'>Leave empty if no change.</small>
          </div>

          {/* Buttons */}
          <div className='form-actions'>
            <button type='submit' className='add-btn'>
              Save Pet
            </button>
            <button
              type='button'
              className='cancel-btn'
              onClick={() => navigate('/admin/pets')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PetEdit;
