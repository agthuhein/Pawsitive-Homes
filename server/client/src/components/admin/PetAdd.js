import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PetAdd = () => {
  const navigate = useNavigate();
  return (
    <main className='main-content'>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Pet</h2>

      <div className='form-wrapper'>
        <form
          action='/api/pets/create'
          method='POST'
          enctype='multipart/form-data'
          className='pet-form'
        >
          <div className='form-group'>
            <label for='name'>Pet Name</label>
            <input type='text' id='name' name='name' required />
          </div>

          <div className='form-group'>
            <label for='age'>Age</label>
            <input
              type='text'
              id='age'
              name='age'
              placeholder='e.g. 2 years'
              required
            />
          </div>

          <div className='form-group'>
            <label for='breed'>Breed</label>
            <input
              type='text'
              id='breed'
              name='breed'
              placeholder='e.g. Golden Retriever'
              required
            />
          </div>

          <div className='form-group'>
            <label for='gender'>Gender</label>
            <select id='gender' name='gender' required>
              <option value=''>-- Select Gender --</option>
              <option value='male'>Male ♂</option>
              <option value='female'>Female ♀</option>
            </select>
          </div>

          <div className='form-group'>
            <label for='color'>Color</label>
            <input
              type='text'
              id='color'
              name='color'
              placeholder='e.g. Brown'
              required
            />
          </div>

          <div className='form-group'>
            <label for='description'>Description</label>
            <textarea
              id='description'
              name='description'
              rows='3'
              placeholder='Write about this pet...'
              required
            ></textarea>
          </div>

          <div className='form-group'>
            <label for='category'>Category</label>
            <select id='category' name='category' required>
              <option value=''>-- Select Category --</option>
              <option value='dog'>Dog</option>
              <option value='cat'>Cat</option>
              <option value='other'>Other</option>
            </select>
          </div>

          <div className='form-group'>
            <label for='status'>Status</label>
            <select id='status' name='status'>
              <option value='available'>Available</option>
              <option value='adopted'>Adopted</option>
              <option value='pending'>Pending</option>
            </select>
          </div>

          <div className='form-group'>
            <label for='traits'>Traits</label>
            <input
              type='text'
              id='traits'
              name='traits'
              placeholder='[{"key":"friendly","value":true}]'
            />
          </div>

          <div className='form-group'>
            <label for='image'>Main Image</label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/*'
              required
            />
          </div>

          <div className='form-group'>
            <label for='additionalImages'>Additional Images</label>
            <input
              type='file'
              id='additionalImages'
              name='additionalImages'
              accept='image/*'
              multiple
            />
          </div>

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
