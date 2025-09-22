import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CARD_WIDTH = 260; // px (card + gap)

const Dogs = () => {
  const [dogs, setDogs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDogs = async () => {
      try {
        const res = await axios.get('/api/pets/');
        const onlyAvailableDogs = res.data.filter(
          (p) =>
            p.category?.name === 'Dog' &&
            p.status?.toLowerCase?.() === 'available'
        );
        setDogs(onlyAvailableDogs);
      } catch (err) {
        console.error('Error fetching dogs', err);
      }
    };
    loadDogs();
  }, []);

  const nextDogs = () => {
    if (currentIndex < dogs.length - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevDogs = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className='cards-section'>
      <div className='cards-header'>
        <h2>Find Dogs 🐕</h2>
        <div className='cards-controls'>
          <button
            className='see-more'
            onClick={() => navigate('/user/pets?category=Dog&status=available')}
          >
            See more
          </button>
          <button
            className='arrow'
            onClick={prevDogs}
            disabled={currentIndex === 0}
          >
            &larr;
          </button>
          <button
            className='arrow'
            onClick={nextDogs}
            disabled={currentIndex >= dogs.length - 4}
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className='cards-carousel'>
        <div
          className='cards-track'
          style={{ transform: `translateX(-${currentIndex * CARD_WIDTH}px)` }}
        >
          {dogs.map((dog) => {
            const g = dog.gender?.toLowerCase?.();
            const genderShort = g === 'male' ? 'm' : g === 'female' ? 'f' : '?';
            return (
              <div
                key={dog._id}
                className='card'
                onClick={() => navigate(`/pets/${dog._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className='card-img'>
                  <img
                    src={`http://localhost:4000${dog.image}`}
                    alt={dog.name}
                  />
                </div>
                <div className='card-info'>
                  <h3>
                    {dog.name} ({genderShort})
                  </h3>
                  <p>{dog.age}</p>
                </div>
              </div>
            );
          })}
          {dogs.length === 0 && <p>No dogs available.</p>}
        </div>
      </div>
    </section>
  );
};

export default Dogs;
