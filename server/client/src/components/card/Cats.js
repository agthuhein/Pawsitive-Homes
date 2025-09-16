import React from 'react';

const Cats = () => {
  return (
    <section className='cards-section'>
      <div className='cards-header'>
        <h2>Find Cats 🐈</h2>
        <div className='cards-controls'>
          <button className='see-more'>See more</button>
          <button className='arrow'>&larr;</button>
          <button className='arrow'>&rarr;</button>
        </div>
      </div>

      <div className='cards'>
        <div className='card'>
          <div className='card-img'>
            <img src='c1.jpg' alt='Dog' />
          </div>
          <div className='card-info'>
            <h3>Zazu (m)</h3>
            <p>3 years</p>
          </div>
        </div>

        <div className='card'>
          <div className='card-img'>
            <img src='c2.jpg' alt='Dog' />
          </div>
          <div className='card-info'>
            <h3>Mina (f)</h3>
            <p>1 year</p>
          </div>
        </div>

        <div className='card'>
          <div className='card-img'>
            <img src='c3.jpg' alt='Dog' />
          </div>
          <div className='card-info'>
            <h3>Simba (m)</h3>
            <p>2 years</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-img'>
            <img src='c4.jpg' alt='Dog' />
          </div>
          <div className='card-info'>
            <h3>Simba (m)</h3>
            <p>2 years</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cats;
