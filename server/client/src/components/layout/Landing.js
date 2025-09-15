import React from 'react';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <section class='banner'>
      <div class='container'>
        <div class='banner-img'>
          <img src='home.jpg' alt='Pet adoption' />
        </div>
        <div class='banner-text'>
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
