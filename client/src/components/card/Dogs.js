import React from 'react';

const Dogs = () => {
  return (
    <section className='cards-section'>
      <div className='cards-header'>
        <h2>Find Dogs 🐕</h2>
        <div className='cards-controls'>
          <button className='see-more'>See more</button>
          <button className='arrow'>&larr;</button>
          <button className='arrow'>&rarr;</button>
        </div>
      </div>

      <div className='cards'>
        <div className='card'>
          <div className='card-img'>
            <img src='d1.jpg' alt='Dog' />
          </div>
          <div className='card-info'>
            <h3>Zazu (m)</h3>
            <p>3 years</p>
          </div>
        </div>

        <div className='card'>
          <div className='card-img'>
            <img src='d2.jpg' alt='Dog' />
          </div>
          <div className='card-info'>
            <h3>Mina (f)</h3>
            <p>1 year</p>
          </div>
        </div>

        <div className='card'>
          <div className='card-img'>
            <img src='d3.jpg' alt='Dog' />
          </div>
          <div className='card-info'>
            <h3>Simba (m)</h3>
            <p>2 years</p>
          </div>
        </div>

        <div className='card'>
          <div className='card-img'>
            <img src='d4.jpg' alt='Dog' />
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

export default Dogs;
