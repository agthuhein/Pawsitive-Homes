import React from 'react';
import PreFooter from '../layout/PreFooter';
import Footer from '../layout/Footer';

const About = () => {
  return (
    <main className='main-content'>
      <section className='success-hero'>
        <div className='success-hero__img'>
          <img src='/about.jpg' alt='Happy adoption' />
        </div>
        <div className='success-hero__text'>
          <h2>About Pawsitive Home</h2>
          <p>
            At Pawsitive Home, we believe that every pet deserves the chance to
            live in a safe, loving environment. Our mission is to rescue, heal,
            and place pets into caring homes, while fostering meaningful
            connections between animals, families, and the community.
          </p>
        </div>
      </section>

      <section className='about-section'>
        <h2>Our Mission</h2>
        <p>
          We are dedicated to saving lives by offering shelter, veterinary care,
          and adoption opportunities for abandoned and homeless pets. Through
          education and advocacy, we aim to inspire compassion and responsible
          pet ownership within our community.
        </p>
      </section>

      <section className='about-section'>
        <h2>Our Vision</h2>
        <p>
          We envision a world where every pet is cherished in a forever home —
          free from neglect, abuse, and abandonment — and where people and
          animals thrive together in harmony.
        </p>
      </section>

      <section className='about-section team-section'>
        <h2>Our Values</h2>
        <ul>
          <li>
            ❤️ Compassion – We treat every animal with kindness, empathy, and
            respect.
          </li>
          <li>
            🏠 Forever Homes – We are committed to uniting pets with families
            who will love them for life.
          </li>
          <li>
            🌍 Community Engagement – We work hand-in-hand with shelters,
            volunteers, and families to create a strong support network for
            animals in need.
          </li>
          <li>
            🤝 Integrity & Trust – We uphold transparency, honesty, and
            responsibility in everything we do.
          </li>
        </ul>
      </section>

      <PreFooter />
      <Footer />
    </main>
  );
};

export default About;
