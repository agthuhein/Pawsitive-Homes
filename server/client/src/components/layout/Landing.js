import React from 'react';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <section className='banner'>
      <div className='container'>
        <div className='banner-img'>
          <img src='home.jpg' alt='Pet adoption' />
        </div>
        <div className='banner-text'>
          <h2>Every Paw Deserves a Home.</h2>
          <p>
            Each year, over 100,000 pets go without homes. At Pawsitive Home,
            you can make a difference—adopt today.
          </p>
        </div>
      </div>
    </section>
  );
};
export default Landing;
