import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PetEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  const [ageNumber, setAgeNumber] = useState('');
  const [ageUnit, setAgeUnit] = useState('');
  const [selectedTraits, setSelectedTraits] = useState([]);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/pets/${id}`);
        setPet(res.data);

        const match = res.data.age.match(/(\d+)\s*(year|month)/i);
        if (match) {
          setAgeNumber(match[1]);
          setAgeUnit(match[2]);
        }

        setSelectedTraits(res.data.traits || []);
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

    // Age handling
    let ageValue = `${ageNumber} ${ageUnit}`;
    if (parseInt(ageNumber, 10) > 1) ageValue += 's';
    formData.set('age', ageValue);

    // Traits handling
    formData.delete('traits');
    formData.set('traits', JSON.stringify(selectedTraits));

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/api/pets/${pet._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire('Success!', 'Pet updated successfully 🎉', 'success').then(() =>
        navigate('/admin/pets')
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
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                id='ageNumber'
                name='ageNumber'
                value={ageNumber}
                onChange={(e) => setAgeNumber(e.target.value)}
                required
              >
                <option value=''>-- Select Number --</option>
                {[...Array(30)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                id='ageUnit'
                name='ageUnit'
                value={ageUnit}
                onChange={(e) => setAgeUnit(e.target.value)}
                required
              >
                <option value=''>-- Select Unit --</option>
                <option value='year'>Year</option>
                <option value='month'>Month</option>
              </select>
            </div>
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
              <option value='unknown'>Unknown</option>
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
            <select
              id='traits'
              name='traits'
              multiple
              value={selectedTraits}
              onChange={(e) =>
                setSelectedTraits(
                  Array.from(e.target.selectedOptions).map((opt) => opt.value)
                )
              }
            >
              <option value='Friendly'>Friendly</option>
              <option value='Playful'>Playful</option>
              <option value='Good with Kids'>Good with Kids</option>
              <option value='Good with Other Pets'>Good with Other Pets</option>
              <option value='Trained'>Trained / House-trained</option>
              <option value='Energetic'>Energetic</option>
              <option value='Calm'>Calm</option>
              <option value='Shy'>Shy / Timid</option>
              <option value='Protective'>Protective</option>
              <option value='Intelligent'>Intelligent</option>
              <option value='Affectionate'>Affectionate</option>
              <option value='Independent'>Independent</option>
              <option value='Curious'>Curious</option>
              <option value='Loyal'>Loyal</option>
              <option value='Gentle'>Gentle</option>
              <option value='Active Outdoors'>Active Outdoors</option>
              <option value='Indoor Only'>Indoor Only</option>
              <option value='Special Needs'>Special Needs</option>
            </select>
            <small>
              Hold CTRL (Windows) / CMD (Mac) to select multiple traits
            </small>
          </div>

          {/* Image Upload */}
          <div className='form-group'>
            <label htmlFor='image'>Main Image</label>
            <input type='file' id='image' name='image' accept='image/*' />
            <small className='small-style'>Leave empty if no change.</small>
          </div>

          {/* Additional Images */}
          <div className='form-group'>
            <label htmlFor='additionalImages'>Additional Images (max 2)</label>
            <input
              type='file'
              id='additionalImages'
              name='additionalImages'
              accept='image/*'
              multiple
              onChange={(e) => {
                if (e.target.files.length > 2) {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Too many images',
                    text: 'You can only upload up to 2 additional images.',
                  });
                  e.target.value = '';
                }
              }}
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
