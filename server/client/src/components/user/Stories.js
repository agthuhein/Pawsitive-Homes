import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PreFooter from '../layout/PreFooter';
import Footer from '../layout/Footer';

const Stories = () => {
  const [adoptedPets, setAdoptedPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdopted = async () => {
      try {
        const res = await axios.get('/api/pets/');
        // ✅ Case-insensitive filter for adopted pets
        setAdoptedPets(
          res.data.filter((p) => p.status?.toLowerCase() === 'adopted')
        );
      } catch (err) {
        console.error('Error fetching adopted pets', err);
      } finally {
        setLoading(false);
      }
    };
    loadAdopted();
  }, []);

  if (loading) return <p>Loading success stories...</p>;

  return (
    <main className='main-content'>
      {/* Hero / Intro */}
      <section className='success-hero'>
        <div className='success-hero__img'>
          <img src='/success-hero.jpg' alt='Happy adoption' />
        </div>
        <div className='success-hero__text'>
          <h2>Together, We Save Lives</h2>
          <p>
            Every adoption story is a life rescued and a family’s love
            fulfilled. Discover how you can be part of the change.
          </p>
          <img
            src='/partner-logo.jpg'
            alt='Partner logo'
            className='partner-logo'
          />
        </div>
      </section>

      {/* Adopted Pets Grid */}
      <section className='success-grid-section'>
        <h2>Finding Homes, Creating Bonds</h2>
        <p>
          Thanks to the kindness of families, so many pets have found the
          forever homes they deserve.
        </p>

        <div className='success-grid'>
          {adoptedPets.length > 0 ? (
            adoptedPets.map((pet) => (
              <div key={pet._id} className='success-card'>
                <div className='success-card__img'>
                  <img
                    src={`http://localhost:4000${pet.image}`}
                    alt={pet.name}
                  />
                  <span className='adopted-badge'>Adopted ❤️</span>
                </div>
                <div className='success-card__info'>
                  <h3>
                    {pet.name} ({pet.gender?.[0]})
                  </h3>
                  <p>{pet.age}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No success stories yet.</p>
          )}
        </div>
      </section>

      <PreFooter />
      <Footer />
    </main>
  );
};

export default Stories;
