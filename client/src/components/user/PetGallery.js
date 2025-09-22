import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const PetGallery = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('available');
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
    return s && c && st;
  });

  const openDetails = (pet) => {
    Swal.fire({
      width: 900,
      title: `${pet.name} — ${pet.category?.name || ''}`,
      html: `
        <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:16px;align-items:start;max-height:70vh;overflow:auto;">
          <div>
            <img src="http://localhost:4000${pet.image}" 
                 style="width:100%;height:340px;object-fit:cover;border-radius:12px;" />
            ${
              (pet.additionalImages?.length || 0) > 0
                ? `<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
                    ${pet.additionalImages
                      .map(
                        (img) => `
                      <img src="http://localhost:4000${img}" 
                           style="width:110px;height:110px;object-fit:cover;border-radius:8px;" />
                    `
                      )
                      .join('')}
                  </div>`
                : ''
            }
          </div>
          <div style="text-align:left">
            <div style="margin-bottom:8px;color:#444">${pet.description}</div>
            <ul style="list-style:none;padding:0;margin:0 0 10px 0;color:#666;font-size:14px">
              <li><strong>Breed:</strong> ${pet.breed}</li>
              <li><strong>Age:</strong> ${pet.age}</li>
              <li><strong>Gender:</strong> ${pet.gender}</li>
              <li><strong>Status:</strong> ${pet.status}</li>
            </ul>
            ${
              (pet.traits?.length || 0) > 0
                ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin:8px 0">
                    ${pet.traits
                      .map(
                        (t) =>
                          `<span style="padding:6px 10px;border-radius:999px;background:#f6f6f6;font-size:12px;color:#333">${t}</span>`
                      )
                      .join('')}
                  </div>`
                : ''
            }
          </div>
        </div>
      `,
      showCancelButton: true,
      cancelButtonText: 'Close',
      confirmButtonText: 'Adopt',
      reverseButtons: true,
      preConfirm: () => true,
    }).then((res) => {
      if (res.isConfirmed) {
        navigate(`/user/pets/${pet._id}/adopt`); // ✅ match route
      }
    });
    setTimeout(() => {
      const btn = document.getElementById('adopt-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          Swal.close();
          navigate(`/user/pets/${pet._id}/adopt`); // ✅ match route
        });
      }
    }, 0);
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
        </div>
      </div>

      <div className='cards' style={{ marginTop: 16 }}>
        {filtered.map((pet) => (
          <div
            key={pet._id}
            className='card'
            onClick={() => openDetails(pet)}
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
