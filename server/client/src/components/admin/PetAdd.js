import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PetAdd = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  // ✅ Fetch categories from backend
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

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const token = localStorage.getItem('token'); // must be Admin token
      const res = await axios.post(
        'http://localhost:4000/api/pets/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Pet created:', res.data);
      alert('Pet created successfully!');
      navigate('/admin/pets'); // go back to pet list
    } catch (err) {
      console.error('Error creating pet:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Failed to create pet');
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
            <input
              type='text'
              id='age'
              name='age'
              placeholder='e.g. 2 years'
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
            <input
              type='text'
              id='traits'
              name='traits'
              placeholder='e.g. Friendly, Best with kids, Playful'
            />
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
          <div className='form-group'>
            <label htmlFor='additionalImages'>Additional Images</label>
            <input
              type='file'
              id='additionalImages'
              name='additionalImages'
              accept='image/*'
              multiple
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
