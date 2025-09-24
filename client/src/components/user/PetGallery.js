import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PetGallery = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('available');
  const [filterGender, setFilterGender] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get('/api/pets/');
        setPets(res.data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = pets.filter((p) => {
    const s = p.name.toLowerCase().includes(search.toLowerCase());
    const c = filterCategory ? p.category?.name === filterCategory : true;
    const st = filterStatus ? p.status === filterStatus : true;
    const g = filterGender ? p.gender === filterGender : true;
    return s && c && st && g;
  });

  const goToDetails = (petId) => {
    navigate(`/pets/${petId}`);
  };

  if (loading) return <p>Loading pets...</p>;

  return (
    <main className='main-content'>
      <h2>Find a Pet</h2>
      <div className='controls-row'>
        <p></p>
        <div className='filters'>
          <input
            placeholder='Search...'
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
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
          >
            <option value=''>All Genders</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
          </select>
        </div>
      </div>

      <div className='cards' style={{ marginTop: 16 }}>
        {filtered.map((pet) => (
          <div
            key={pet._id}
            className='card'
            onClick={() => goToDetails(pet._id)}
            style={{ cursor: 'pointer' }}
          >
            <div className='card-img'>
              <img src={`http://localhost:4000${pet.image}`} alt={pet.name} />
            </div>
            <div className='card-info'>
              <h3>{pet.name}</h3>
              <p>
                {pet.breed} • {pet.age}
              </p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p>No pets found.</p>}
      </div>
    </main>
  );
};

export default PetGallery;
