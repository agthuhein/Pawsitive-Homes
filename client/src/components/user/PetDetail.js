import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`/api/pets/${id}`);
        setPet(res.data);
      } catch (err) {
        console.error('Error loading pet', err);
        Swal.fire('Error', 'Could not load pet details', 'error');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading pet...</p>;
  if (!pet) return <p style={{ textAlign: 'center' }}>Pet not found.</p>;

  const gender = pet.gender?.toLowerCase?.();
  const genderLabel =
    gender === 'male'
      ? '♂ Male'
      : gender === 'female'
      ? '♀ Female'
      : '⚪ Unknown';

  const status = pet.status?.toLowerCase?.();
  const statusLabel =
    status === 'available'
      ? '✅ Available'
      : status === 'pending'
      ? '⏳ Pending'
      : status === 'adopted'
      ? '❌ Adopted'
      : '⚪ Unknown';

  const handleAdopt = () => {
    if (status !== 'available') return;
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      Swal.fire('Login Required', 'Please login to adopt a pet.', 'info').then(
        () => navigate('/login')
      );
    } else if (role !== 'user') {
      Swal.fire(
        'Access Denied',
        'Only user accounts can adopt pets.',
        'warning'
      );
    } else {
      navigate(`/user/pets/${pet._id}/adopt`);
    }
  };

  return (
    <main className='main-content'>
      <div className='pet-detail__grid'>
        {/* LEFT */}
        <section className='pet-detail__left'>
          <div className='pet-detail__gallery'>
            <figure className='pet-detail__gallery-main'>
              <img src={`http://localhost:4000${pet.image}`} alt={pet.name} />
            </figure>

            {pet.additionalImages?.length > 0 && (
              <div className='pet-detail__thumbs'>
                {pet.additionalImages.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:4000${img}`}
                    alt={`${pet.name} ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Quick facts */}
          <ul className='pet-detail__facts'>
            <li title='Breed'>🐾 {pet.breed}</li>
            <li title='Gender'>{genderLabel}</li>
            <li title='Age'>📅 {pet.age}</li>
            <li title='Status'>{statusLabel}</li>
          </ul>

          {/* Description */}
          <p className='pet-detail__desc'>{pet.description}</p>

          {/* Traits */}
          {pet.traits?.length > 0 && (
            <div className='pet-detail__traits'>
              {pet.traits.map((t, i) => (
                <span key={i} className='pet-detail__chip'>
                  {t}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* RIGHT */}
        <aside className='pet-detail__right'>
          <div className='pet-detail__sidecard pet-detail__sidecard--cta'>
            <h3>Adopt {pet.name}</h3>
            <p>
              {status === 'available'
                ? `Ready to give ${pet.name} a forever home?`
                : `This pet is not currently available for adoption.`}
            </p>
            <button
              onClick={handleAdopt}
              className='add-btn'
              disabled={status !== 'available'}
              style={{
                opacity: status === 'available' ? 1 : 0.6,
                cursor: status === 'available' ? 'pointer' : 'not-allowed',
              }}
            >
              🐾 Adopt Me
            </button>

            <p className='pet-detail__helper'>
              <button
                onClick={() => navigate('/user/pets')}
                className='back-btn'
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#1a083d',
                  marginTop: '10px',
                }}
              >
                ← Back
              </button>
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default PetDetail;
