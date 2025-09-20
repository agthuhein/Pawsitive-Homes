import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CARD_WIDTH = 260; // px (card + gap)

const Cats = () => {
  const [cats, setCats] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCats = async () => {
      try {
        const res = await axios.get('/api/pets/');
        const onlyAvailableCats = res.data.filter(
          (p) =>
            p.category?.name === 'Cat' &&
            p.status?.toLowerCase?.() === 'available'
        );
        setCats(onlyAvailableCats);
      } catch (err) {
        console.error('Error fetching cats', err);
      }
    };
    loadCats();
  }, []);

  const nextCats = () => {
    if (currentIndex < cats.length - 4) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevCats = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className='cards-section'>
      <div className='cards-header'>
        <h2>Find Cats 🐈</h2>
        <div className='cards-controls'>
          <button
            className='see-more'
            onClick={() => navigate('/user/pets?category=Cat&status=available')}
          >
            See more
          </button>
          <button
            className='arrow'
            onClick={prevCats}
            disabled={currentIndex === 0}
          >
            &larr;
          </button>
          <button
            className='arrow'
            onClick={nextCats}
            disabled={currentIndex >= cats.length - 4}
          >
            &rarr;
          </button>
        </div>
      </div>

      <div className='cards-carousel'>
        <div
          className='cards-track'
          style={{ transform: `translateX(-${currentIndex * 260}px)` }}
        >
          {cats.map((cat) => {
            const g = cat.gender?.toLowerCase?.();
            const genderShort = g === 'male' ? 'm' : g === 'female' ? 'f' : '?';
            return (
              <div
                key={cat._id}
                className='card'
                onClick={() => navigate(`/pets/${cat._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className='card-img'>
                  <img
                    src={`http://localhost:4000${cat.image}`}
                    alt={cat.name}
                  />
                </div>
                <div className='card-info'>
                  <h3>
                    {cat.name} ({genderShort})
                  </h3>
                  <p>{cat.age}</p>
                </div>
              </div>
            );
          })}
          {cats.length === 0 && <p>No cats available.</p>}
        </div>
      </div>
    </section>
  );
};

export default Cats;
