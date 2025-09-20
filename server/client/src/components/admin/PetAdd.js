import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PetAdd = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/category/all');
        setCategories(res.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoadingCats(false);
      }
    };

    fetchCategories();
  }, []);

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Handle Age (pluralize if > 1)
    const ageNumber = formData.get('ageNumber');
    let ageUnit = formData.get('ageUnit');
    if (parseInt(ageNumber, 10) > 1) ageUnit += 's';
    formData.delete('ageNumber');
    formData.delete('ageUnit');
    formData.set('age', `${ageNumber} ${ageUnit}`);

    // Handle Traits (multi-select)
    const selectedTraits = Array.from(e.target.traits.selectedOptions).map(
      (opt) => opt.value
    );
    formData.delete('traits');
    formData.set('traits', selectedTraits.join(','));

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/api/pets/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        title: 'Success!',
        text: 'Pet created successfully 🎉',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/admin/pets');
      });
    } catch (err) {
      Swal.fire({
        title: 'Error!',
        text: err.response?.data?.error || 'Something went wrong!',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };

  return (
    <main className='main-content'>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Pet</h2>

      <div className='form-wrapper'>
        <form
          onSubmit={handleSubmit}
          encType='multipart/form-data'
          className='pet-form'
        >
          {/* Pet Name */}
          <div className='form-group'>
            <label htmlFor='name'>Pet Name</label>
            <input type='text' id='name' name='name' required />
          </div>

          {/* Age */}
          <div className='form-group'>
            <label htmlFor='age'>Age</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select id='ageNumber' name='ageNumber' required>
                <option value=''>-- Select Number --</option>
                {[...Array(30)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select id='ageUnit' name='ageUnit' required>
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
              placeholder='e.g. Golden Retriever'
              required
            />
          </div>

          {/* Gender */}
          <div className='form-group'>
            <label htmlFor='gender'>Gender</label>
            <select id='gender' name='gender' required>
              <option value=''>-- Select Gender --</option>
              <option value='male'>Male ♂</option>
              <option value='female'>Female ♀</option>
            </select>
          </div>

          {/* Color */}
          <div className='form-group'>
            <label htmlFor='color'>Color</label>
            <input
              type='text'
              id='color'
              name='color'
              placeholder='e.g. Brown'
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
              placeholder='Write about this pet...'
              required
            ></textarea>
          </div>

          {/* Category */}
          <div className='form-group'>
            <label htmlFor='category'>Category</label>
            <select id='category' name='category' required>
              <option value=''>-- Select Category --</option>
              {loadingCats ? (
                <option disabled>Loading...</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Status */}
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select id='status' name='status'>
              <option value='available'>Available</option>
              <option value='adopted'>Adopted</option>
              <option value='pending'>Pending</option>
            </select>
          </div>

          {/* Traits */}
          <div className='form-group'>
            <label htmlFor='traits'>Traits</label>
            <select id='traits' name='traits' multiple>
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

          {/* Main Image */}
          <div className='form-group'>
            <label htmlFor='image'>Main Image</label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/*'
              required
            />
          </div>

          {/* Additional Images */}
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
                  e.target.value = ''; // reset input
                }
              }}
            />
          </div>

          {/* Actions */}
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

export default PetAdd;
