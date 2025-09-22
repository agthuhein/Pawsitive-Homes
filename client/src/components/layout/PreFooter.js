import React from 'react';

const PreFooter = () => {
  return (
    <div className='pre-footer'>
      <div className='pre-footer__left'>
        <h2 className='brand'>Pawsitive Home</h2>
        <p className='tagline'>The adoption app that saves lives</p>
        <ul className='links'>
          <li>
            <a href='/login'>Adopt a dog</a>
          </li>
          <li>
            <a href='/login'>Adopt a cat</a>
          </li>
          <li>
            <a href='/stories'>Success Stories</a>
          </li>
          <li>
            <a href='/about'>About us</a>
          </li>
          <li>
            <a href='/contact'>Contact</a>
          </li>
        </ul>
      </div>

      <div className='pre-footer__right'>
        <p>Coming soon</p>
        <p></p>
        <div className='app-buttons'>
          <img src='apple.png' alt='Download on App Store' />
          <img src='google.png' alt='Get it on Google Play' />
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
