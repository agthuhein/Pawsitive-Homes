import React from 'react';
import PreFooter from '../layout/PreFooter';
import Footer from '../layout/Footer';

const Contact = () => {
  return (
    <main className='main-content'>
      <section className='success-hero'>
        <div className='success-hero__img'>
          <img src='/contact.jpg' alt='Contact us' />
        </div>
        <div className='success-hero__text'>
          <h2>Contact Us</h2>
          <p>
            Have questions, interested in volunteering, or ready to welcome a
            pet into your home? Get in touch with us — we’re here to help and
            would love to hear from you!
          </p>
        </div>
      </section>
      <section className='about-section'>
        <h2>Get in Touch</h2>
        <p>
          📍 Address: 123 Pawsitive Street, Berlin, Germany <br />
          📞 Phone: +49 123 456 789 <br />
          📧 Email: contact@pawsitivehome.org
        </p>
      </section>

      <section className='about-section'>
        <h2>Send Us a Message</h2>
        <form className='contact-form'>
          <div className='form-group'>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Enter your name'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Enter your email'
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='message'>Message</label>
            <textarea
              id='message'
              name='message'
              rows='5'
              placeholder='Type your message...'
              required
            ></textarea>
          </div>

          <div className='form-actions'>
            <button type='submit' className='add-btn'>
              Send Message
            </button>
          </div>
        </form>
      </section>

      <PreFooter />
      <Footer />
    </main>
  );
};

export default Contact;
